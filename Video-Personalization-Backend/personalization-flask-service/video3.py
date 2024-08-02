import ffmpeg
import pandas as pd
from IPython.display import Audio
import whisper
import json
from moviepy.editor import TextClip, CompositeVideoClip
from IPython.display import HTML
from base64 import b64encode
from moviepy.editor import VideoFileClip
import os
from flask import Flask, request
import pandas as pd
import py_eureka_client.eureka_client as eureka_client
from werkzeug.utils import secure_filename
from flask import request, jsonify, send_from_directory
from flask import Flask
from flask_cors import CORS
from VideoFinal3 import final_process_video
from SpringMicroserviceClient import SpringMicroserviceClient


rest_port = 5000
eureka_client.init(eureka_server="http://eureka:password@localhost:8761/eureka",
                   app_name="data-personalization-service",
                   instance_port=rest_port)
app = Flask(__name__)


CORS(app, resources={
    r"/process_video": {"origins": "http://localhost:4200"},
    r"/upload_csv": {"origins": "http://localhost:4200"},
    r"/personalized_videos": {"origins": "http://localhost:4200"},
    r"/get_final_video": {"origins": "http://localhost:4200"},
    r"/videos/": {"origins": "http://localhost:4200"},


})
# Define the allowed video file extensionsonqs
ALLOWED_EXTENSIONS = {'mp4'}


# Fonction pour vérifier si l'extension de fichier est autorisée
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Route de test

@app.route('/upload_csv', methods=['POST'])
def upload_csv():
    try:
        # Récupérer le fichier CSV envoyé depuis Angular
        csv_file = request.files['file']

        # Enregistrer le fichier CSV localement
        csv_file_path = os.path.join(os.getcwd(), 'data.csv')
        csv_file.save(csv_file_path)
        print(csv_file_path)

        # Exemple de réponse réussie
        return jsonify({'message': 'Fichier CSV téléchargé et traité avec succès !'}), 200
    except Exception as e:
        # En cas d'erreur, renvoyer un message d'erreur
        return jsonify({'error': str(e)}), 500

@app.route('/personalized_videos', methods=['POST'])
def personalized_videos():
    try:
        df = pd.read_csv('data.csv', encoding='utf-8')

        # Récupérer les mots-clés envoyés depuis Angular
        keywords = json.loads(request.form['keywords'])
        print(keywords)

        # Récupérer le texte résultant de la transcription envoyé depuis Angular
        result_text = json.loads(request.form['result_text'])
        print(result_text)

        # Récupérer le chemin du fichier vidéo obtenu dans la route /process_video
        video_path = json.loads(request.form['file_path'])
        print(video_path)

#         video_path = "uploads\FilleVideo_-_Trim.mp4"
#         print(video_path)

        first_names = []
        last_names = []
        telephones = []
        emails = []
        for index, row in df.iterrows():
            # Utiliser l'index de la boucle comme identifiant unique
            final_video_filename = final_process_video(video_path, keywords, result_text, index)
            first_names.append(row['first_name'])
            last_names.append(row['last_name'])
            telephones.append((row['telephone']))
            emails.append((row['email']))
        # Envoyer une réponse réussie avec le chemin d'accès de la vidéo finale
        return jsonify({'videoPath': final_video_filename}, {'first_name': first_names}, {'last_name': last_names},
                       {'telephone': telephones}, {'email': emails}), 200
    except Exception as e:
        # En cas d'erreur, renvoyer un message d'erreur
        return jsonify({'error': str(e)}), 500




#
# @app.route('/personalized_videos', methods=['POST'])
# def personalized_videos():
#     try:
#         df = pd.read_csv('data.csv', encoding='utf-8')
#
#         # Récupérer les mots-clés envoyés depuis Angular
#         keywords = json.loads(request.form['keywords'])
#         print(keywords)
#
#         # Récupérer le texte résultant de la transcription envoyé depuis Angular
#         result_text = json.loads(request.form['result_text'])
#         print(result_text)
#
#         # Récupérer le chemin du fichier vidéo obtenu dans la route /process_video
#         video_path = json.loads(request.form['file_path'])
#         print(video_path)
#
#         first_names = []
#         last_names = []
#         telephones = []
#         emails = []
#         for index, row in df.iterrows():
#             # Utiliser l'index de la boucle comme identifiant unique
#             final_video_filename = final_process_video(video_path, keywords, result_text, index)
#             first_names.append(row['first_name'])
#             last_names.append(row['last_name'])
#             telephones.append((row['telephone']))
#             emails.append((row['email']))
#         response_data = {
#                     'videoPath': final_video_filename,
#                     'first_names': first_names,
#                     'last_names': last_names,
#                     'telephones': telephones,
#                     'emails': emails
#                 }
#
#                 # Initialiser le client Feign pour le service Spring
#         feign_client = SpringMicroserviceClient()
#
#                         # Appeler la méthode du client Feign pour envoyer les données à Spring
#         response_from_spring = feign_client.send_data_to_spring(response_data)
#
#                         # Renvoyer la réponse du service Spring au client Flask
#         return jsonify(response_from_spring), 200
#
#     except Exception as e:
#         # En cas d'erreur, renvoyer un message d'erreur
#         return jsonify({'error': str(e)}), 500



@app.route('/videos/<path:filename>')
def serve_video(filename):
    videos_directory = 'C:/Users/pc/IdeaProjects/VideoPersonalization/personalization-flask-service/'
    return send_from_directory(videos_directory, filename)
@app.route('/process_video', methods=['GET', 'POST'])
def process_video():
    print("Début du traitement de la requête POST /process_video")
    file = request.files['file']
    print("Nom du fichier:", file.filename)

    if 'file' not in request.files:
        print("No file part")
        return jsonify({'error': 'No file part'}), 400

    print("Start video processing...")

    file = request.files['file']
    print(file)
    if file.filename == '':
        return "No selected file"

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join("uploads", filename)
        file.save(file_path)

        mp4videoURL = file_path
        videofilename = mp4videoURL.split('/')[-1]
        print(videofilename)

        # shutil.copy(mp4videoURL, videofilename)
        audiofilename = videofilename.replace(".mp4", '.mp3')

        # Create the ffmpeg input stream
        input_stream = ffmpeg.input(videofilename)

        # Extract the audio stream from the input stream
        audio = input_stream.audio

        # Save the audio stream as an MP3 file
        output_stream = ffmpeg.output(audio, audiofilename)
        # Overwrite output file if it already exists
        output_stream = ffmpeg.overwrite_output(output_stream)

        ffmpeg.run(output_stream)

        print(audiofilename)

        Audio(audiofilename)

        # might take some time (approx 3- 5min depending on audio length)
        model = whisper.load_model("medium")
        result = model.transcribe(audiofilename, word_timestamps=True)
        print(result)

        # total text
        print(result['text'])

        # each subtitle segment
        for each in result['segments']:
            print(each)

        wordlevel_info = []

        for each in result['segments']:
            words = each['words']
            for word in words:
                wordlevel_info.append({'word': word['word'].strip(), 'start': word['start'], 'end': word['end']})

        wordlevel_info

        with open('data.json', 'w') as f:
            json.dump(wordlevel_info, f, indent=4)

        with open('data.json', 'r') as f:
            wordlevel_info_modified = json.load(f)

        wordlevel_info_modified

        def split_text_into_lines(data):
            MaxChars = 80
            # maxduration in seconds
            MaxDuration = 3.0
            # Split if nothing is spoken (gap) for these many seconds
            MaxGap = 1.5

            subtitles = []
            line = []
            line_duration = 0
            line_chars = 0

            for idx, word_data in enumerate(data):
                word = word_data["word"]
                start = word_data["start"]
                end = word_data["end"]
                line.append(word_data)
                line_duration += end - start
                temp = " ".join(item["word"] for item in line)

                # Check if adding a new word exceeds the maximum character count or duration
                new_line_chars = len(temp)

                duration_exceeded = line_duration > MaxDuration
                chars_exceeded = new_line_chars > MaxChars

                if idx > 0:
                    gap = word_data['start'] - data[idx - 1]['end']
                    # print (word,start,end,gap)
                    maxgap_exceeded = gap > MaxGap
                else:
                    maxgap_exceeded = False

                if duration_exceeded or chars_exceeded or maxgap_exceeded:
                    if line:
                        subtitle_line = {
                            "word": " ".join(item["word"] for item in line),
                            "start": line[0]["start"],
                            "end": line[-1]["end"],
                            "textcontents": line
                        }
                        subtitles.append(subtitle_line)
                        line = []
                        line_duration = 0
                        line_chars = 0

            if line:
                subtitle_line = {
                    "word": " ".join(item["word"] for item in line),
                    "start": line[0]["start"],
                    "end": line[-1]["end"],
                    "textcontents": line
                }
                subtitles.append(subtitle_line)

            return subtitles

        linelevel_subtitles = split_text_into_lines(wordlevel_info_modified)
        print(linelevel_subtitles)

        for line in linelevel_subtitles:
            json_str = json.dumps(line, indent=4)
            print(json_str)

        def create_caption(textJSON, framesize, font="Helvetica-Bold", fontsize=30, color='white', bgcolor='blue'):
            wordcount = len(textJSON['textcontents'])
            full_duration = textJSON['end'] - textJSON['start']

            word_clips = []
            xy_textclips_positions = []
            x_pos = 0
            y_pos = 300

            # max_height = 0
            frame_width = framesize[0]
            frame_height = framesize[1]
            x_buffer = frame_width * 1 / 10
            y_buffer = frame_height * 1 / 5

            space_width = ""
            space_height = ""
            for index, wordJSON in enumerate(textJSON['textcontents']):
                duration = wordJSON['end'] - wordJSON['start']
                word_clip = TextClip(wordJSON['word'], font=font, fontsize=fontsize, color=color).set_start(
                    textJSON['start']).set_duration(full_duration)
                word_clip_space = TextClip(" ", font=font, fontsize=fontsize, color=color).set_start(
                    textJSON['start']).set_duration(full_duration)

                word_width, word_height = word_clip.size
                space_width, space_height = word_clip_space.size

                if x_pos + word_width + space_width > frame_width - 2 * x_buffer:
                    # Move to the next line
                    x_pos = 0
                    y_pos = y_pos + word_height + 40

                    # Store info of each word_clip created
                    xy_textclips_positions.append({
                        "x_pos": x_pos + x_buffer,
                        "y_pos": y_pos + y_buffer,
                        "width": word_width,
                        "height": word_height,
                        "word": wordJSON['word'],
                        "start": wordJSON['start'],
                        "end": wordJSON['end'],
                        "duration": duration
                    })
                    word_clip = word_clip.set_position((x_pos + x_buffer, y_pos + y_buffer))
                    word_clip_space = word_clip_space.set_position((x_pos + word_width + x_buffer, y_pos + y_buffer))

                    x_pos = word_width + space_width

                else:
                    # Store info of each word_clip created
                    xy_textclips_positions.append({
                        "x_pos": x_pos + x_buffer,
                        "y_pos": y_pos + y_buffer,
                        "width": word_width,
                        "height": word_height,
                        "word": wordJSON['word'],
                        "start": wordJSON['start'],
                        "end": wordJSON['end'],
                        "duration": duration
                    })
                    word_clip = word_clip.set_position((x_pos + x_buffer, y_pos + y_buffer))
                    word_clip_space = word_clip_space.set_position((x_pos + word_width + x_buffer, y_pos + y_buffer))

                    x_pos = x_pos + word_width + space_width

                word_clips.append(word_clip)
                word_clips.append(word_clip_space)

            for highlight_word in xy_textclips_positions:
                word_clip_highlight = TextClip(highlight_word['word'], font=font, fontsize=fontsize, color=color,
                                               bg_color=bgcolor).set_start(highlight_word['start']).set_duration(
                    highlight_word['duration'])
                word_clip_highlight = word_clip_highlight.set_position(
                    (highlight_word['x_pos'], highlight_word['y_pos']))
                word_clips.append(word_clip_highlight)

            return word_clips

        frame_size = (1080, 1080)

        all_linelevel_splits = []

        for line in linelevel_subtitles:
            out = create_caption(line, frame_size)
            all_linelevel_splits.extend(out)

        # Composite the original video with the subtitles
        input_video = VideoFileClip(mp4videoURL)
        final_video = CompositeVideoClip([input_video] + all_linelevel_splits, size=input_video.size)
        final_video = final_video.set_audio(input_video.audio)

        # Save the final clip as a video file with the audio included
        output_path = "output.mp4"
        final_video.write_videofile(output_path, fps=24, codec="libx264", audio_codec="aac")

        # Display the result
        mp4 = open(output_path, 'rb').read()

        data_url = "data:video/mp4;base64," + b64encode(mp4).decode()
        HTML("""
           <video width=400 controls>
           <source src="%s" type="video/mp4">
           </video>
           """ % data_url)

        return jsonify({
            'wordlevel_info_modified': wordlevel_info_modified,
            'data_url': data_url,
            'file_path': file_path,
            'result_text': result
        })

    else:
        return "Invalid file format"


if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True)
