package com.coldOutreachApp.emailService.service;

import org.springframework.stereotype.Service;


import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;


import javax.mail.*;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;


@Service
public class EmailService {

    public List<String> getEmails(String username, String password, int numberOfEmails, String folder) throws Exception {
        Properties props = new Properties();
        props.setProperty("mail.store.protocol", "imap");
        props.setProperty("mail.imap.host", "imap.gmail.com");
        props.setProperty("mail.imap.port", "993");
        props.setProperty("mail.imap.ssl.enable", "true");

        Session session = Session.getInstance(props);
        Store store = session.getStore("imap");
        store.connect(username, password);

        Folder inbox = store.getFolder(folder);
        inbox.open(Folder.READ_ONLY);

        int messageCount = inbox.getMessageCount();
        Message[] messages = inbox.getMessages(messageCount-numberOfEmails, messageCount);
        List<Message> emailList = Arrays.asList(messages);

        List<String> emailStrings = this.getEmailsAsStrings(emailList);

        inbox.close(false);
        store.close();

        return emailStrings;
    }

    public List<String> getEmailsAsStrings(List<Message> messages) throws MessagingException, IOException {
        List<String> emailStrings = new ArrayList<>();

        for (Message message : messages) {
            String from = Arrays.toString(message.getFrom());
            String subject = message.getSubject();
            String receivedDate= message.getReceivedDate().toString();
            boolean isSeen = message.isSet(Flags.Flag.SEEN);
            boolean isFlagged = message.isSet(Flags.Flag.FLAGGED);

            String content;

            if (message.isMimeType("text/plain")) {
                content = (String) message.getContent();
            } else if (message.isMimeType("multipart/*")) {
                MimeMultipart mimeMultipart = (MimeMultipart) message.getContent();
                content = getTextFromMimeMultipart(mimeMultipart);
            } else {
                content = "Unsupported content type";
            }

            String emailString = "From: " + from + "\nSubject: " + subject + "\nContent: " + content+ "\nDate: "+receivedDate + "\nIsSeen: "+ isSeen+ "\nIsFlagged: "+isFlagged;
            emailStrings.add(emailString);
            System.out.println(emailString);
        }

        return emailStrings;
    }

    private String getTextFromMimeMultipart(MimeMultipart mimeMultipart) throws MessagingException, IOException {
        StringBuilder result = new StringBuilder();

        int count = mimeMultipart.getCount();
        for (int i = 0; i < count; i++) {
            BodyPart bodyPart = mimeMultipart.getBodyPart(i);
            if (bodyPart.isMimeType("text/plain")) {
                result.append((String) bodyPart.getContent());
            } else if (bodyPart.getContent() instanceof MimeMultipart) {
                result.append(getTextFromMimeMultipart((MimeMultipart) bodyPart.getContent()));
            }
        }

        return result.toString();
    }

    public void sendEmail(String senderEmail, String senderPassword, String subject, String message, String csvFileName,String date, String time) {
        try {
            System.out.println("senderEmail "+senderEmail+" senderPassword : "+senderPassword+" csvFileName : "+csvFileName+
                    " subject : "+subject+" message : "+message+" Date : "+date+" Time : "+time);
            JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
            mailSender.setHost("smtp.gmail.com");
            mailSender.setPort(587);
            mailSender.setUsername(senderEmail);
            mailSender.setPassword(senderPassword);
            mailSender.setJavaMailProperties(getMailProperties());

            // Extraction des noms de variables du message
            List<String> variables = extractVariables(message);

            // Extraction des noms de variables du Sujet
            List<String> variablesSubject = extractVariables(subject);

            try (BufferedReader br = new BufferedReader(new FileReader(csvFileName))) {
                // Lire la première ligne pour ignorer les en-têtes
                br.readLine();

                String line;
                while ((line = br.readLine()) != null) {
                    // Diviser la ligne en utilisant la virgule comme séparateur
                    List<String> rowData = Arrays.asList(line.split(","));

                    System.out.println(rowData.toString());
                    System.out.println("index 0 : " + rowData.get(0));

                    javax.mail.internet.MimeMessage mimeMessage = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

                    // Set sender
                    helper.setFrom(senderEmail);

                    // Set recipients
                    helper.setTo(rowData.get(detectEmailColumn(csvFileName)));

                    // Set subject
                    String formattedSubject = replaceVariables(csvFileName,subject, variablesSubject, rowData);
                    helper.setSubject(formattedSubject);

                    // Remplacement des variables dans le message par les valeurs correspondantes
                    String formattedMessage = replaceVariables(csvFileName,message, variables, rowData);
                    helper.setText(formattedMessage);

                    // Schedule or send email based on Date and Time
                    if (date.equals("") && time.equals("")) {
                        System.out.println("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii 1");
                        // Send email immediately
                        mailSender.send(mimeMessage);
                    } else {
                        System.out.println("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii 2");
                        // Schedule email sending
                        scheduleEmail(mailSender, mimeMessage, date, time);
                    }

                }
            }

        } catch (MessagingException | IOException e) {
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }


    private void scheduleEmail(JavaMailSenderImpl mailSender, MimeMessage mimeMessage, String dateStr, String timeStr) {
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

        try {
            SimpleDateFormat dateTimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date scheduledDate = dateTimeFormat.parse(dateStr + " " + timeStr);

            long delay = scheduledDate.getTime() - System.currentTimeMillis();
            if (delay > 0) {
                scheduler.schedule(() -> {
                    try {
                        mailSender.send(mimeMessage);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }, delay, TimeUnit.MILLISECONDS);
            } else {
                throw new RuntimeException("Scheduled time is in the past. Email not sent.");
            }
        } catch (ParseException e) {
            throw new RuntimeException("Invalid date/time format: " + e.getMessage());
        }
    }

    private List<String> extractVariables(String message) {
        List<String> variables = new ArrayList<>();
        Pattern pattern = Pattern.compile("\\{(\\w+)\\}");
        Matcher matcher = pattern.matcher(message);
        while (matcher.find()) {
            variables.add(matcher.group(1));
        }
        return variables;
    }

    private String replaceVariables(String csvFileName,String message, List<String> variables, List<String> values) throws IOException {
        for (int i = 0; i < variables.size(); i++) {
            String variable = variables.get(i);
            String value = values.get(findHeaderIndex(csvFileName, variable));
            message = message.replace("{" + variable + "}", value);
        }
        return message;
    }


    private Properties getMailProperties() {
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        return properties;
    }

    public List<String> getEmailsFromCSV(String csvFileName) throws IOException {
        return Files.readAllLines(Paths.get(csvFileName));
    }

    public static int detectEmailColumn(String csvPath) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader(csvPath))) {
            String[] headers = br.readLine().split(",");
            for (int i = 0; i < headers.length; i++) {
                if (containsEmailInColumn(csvPath, i)) {
                    return i;
                }
            }

            throw new IOException("Email column not found in CSV file.");
        }
    }

    public List<List<String>> getDataFromCSV(String csvFileName) throws IOException {
        List<List<String>> data = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(csvFileName))) {
            // Lire la première ligne pour ignorer les en-têtes
            br.readLine();

            String line;
            while ((line = br.readLine()) != null) {
                // Diviser la ligne en utilisant la virgule comme séparateur
                List<String> rowData = Arrays.asList(line.split(","));

                System.out.println(rowData.toString());
                System.out.println("index 0 : " + rowData.get(0));

                // Ajouter les données de la ligne à la liste des données
                data.add(rowData);
            }
        }

        return data;
    }


    public static int findHeaderIndex(String csvPath, String headerName) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader(csvPath))) {
            // Lire la première ligne pour obtenir les noms des colonnes
            String headerLine = br.readLine();
            // Supprimer le BOM s'il est présent
            if (headerLine != null && headerLine.startsWith("\uFEFF")) {
                headerLine = headerLine.substring(1);
            }
            String[] headers = headerLine.split(",");
            System.out.println("Header line: " + headerLine);

            // Rechercher l'indice de l'en-tête spécifié
            for (int i = 0; i < headers.length; i++) {
                System.out.println("Header " + i + ": [" + headers[i] + "]");
                if (headers[i].trim().equalsIgnoreCase(headerName.trim())) {
                    return i;
                }
            }

            throw new IOException("Header '" + headerName + "' not found in CSV file.");
        }
    }


    private static boolean containsEmailInColumn(String csvPath, int columnIndex) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader(csvPath))) {
            br.readLine();
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                if (data.length > columnIndex) {
                    String columnData = data[columnIndex].trim();
                    if (isValidEmail(columnData)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    private static boolean isValidEmail(String email) {
        // Expression régulière pour la validation des adresses e-mail
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
}
