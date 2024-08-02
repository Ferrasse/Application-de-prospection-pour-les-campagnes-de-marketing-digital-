package demo.uploadVideo.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import demo.uploadVideo.configuration.UpdateModel;
import demo.uploadVideo.entity.Videos;
import demo.uploadVideo.exception.ResourceNotFound;
import demo.uploadVideo.repository.VideoRepository;
import org.springframework.web.multipart.MultipartFile;

@Service
public class VideoService implements VideoInterface   {
	@Value("${upload.path}") // Chemin de stockage des vidéos
	private String uploadPath;
	@Autowired
	private VideoRepository videoRepository ;


	@Value("${upload.video.directory}")
	private String videoDirectory; // Répertoire de stockage des vidéos

	public String saveVideoFile(MultipartFile videoFile, String videoName) throws IOException {
		String videoPath = videoDirectory + File.separator + videoName;
		File file = new File(videoPath);
		videoFile.transferTo(file);
		return videoPath;
	}

	@Override
	public Videos uploadVideo(MultipartFile videoFile) throws IOException {
		// Récupérer le nom de la vidéo
		String videoName = videoFile.getOriginalFilename();
		// Créer un nom de fichier unique pour éviter les conflits
		String uniqueFileName = generateUniqueFileName(videoName);
		// Enregistrer la vidéo sur le système de fichiers
		Path filePath = Paths.get(uploadPath, uniqueFileName);
		Files.copy(videoFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

		// Récupérer l'URL de la vidéo
		String videoUrl = "/videos/" + uniqueFileName; // URL à partir de laquelle la vidéo peut être accessible
		// Date actuelle
		Date addedDate = new Date();

		// Créer un nouvel objet Videos avec les informations
		Videos uploadedVideo = new Videos();
		uploadedVideo.setVideoName(videoName);
		uploadedVideo.setVideoUrl(videoUrl); // Définir l'URL de la vidéo
		uploadedVideo.setAddedDate(addedDate);

		// Enregistrer l'objet Videos dans la base de données
		return videoRepository.save(uploadedVideo);
	}

	// Méthode pour générer un nom de fichier unique
	private String generateUniqueFileName(String originalFileName) {
		// Implémentez votre logique pour générer un nom de fichier unique
		// Vous pouvez utiliser des UUID ou d'autres techniques pour garantir l'unicité
		return UUID.randomUUID().toString() + "-" + originalFileName;
	}


	@Override
	public Videos createPost(Videos videos) {
		if(videos.getTitle().isEmpty()) {
			throw new ResourceNotFound("402" ,"please field required details");
		}
		try {
			Videos saveVideo = videoRepository.save(videos);
			videos.setAddedDate(new Date());
			videos.setVideoName("default.mp4");
			return videoRepository.save(saveVideo);
		}catch(IllegalArgumentException i) {
			throw new ResourceNotFound("401" ,"hey your data is Empty");
		}catch(Exception e) {
			throw new ResourceNotFound("401" ,"something is wrong"+e.getMessage());
		}
	}

	@Override
	public Videos getVideosById(Integer id) {
		Videos video = this.videoRepository.findById(id).orElseThrow(() -> new ResourceNotFound("504","id is not present"));
		return video ;
	}

	@Override
	public List<Videos> getAllVideos() {
		List<Videos> listOfVideo  = null ;
		try {
			listOfVideo = this.videoRepository.findAll();
			return listOfVideo ;
		}catch(Exception e) {
			throw new ResourceNotFound("404","i am sorry "+e.getMessage());
		}
	}

	@Override
	public Videos updatePost(Videos videos, Integer id) {
		Videos video = this.videoRepository.findById(id).orElseThrow(()-> new ResourceNotFound("501","Id not found"));

		video.setTitle(videos.getTitle());
		video.setDescription(videos.getDescription());
		video.setTags(videos.getTags());
		video.setAddedDate(new Date());
		Videos updateVideo =this.videoRepository.save(video);
		return updateVideo ;
	}

	@Override
	public void deleteVideos(Integer id) {
		Videos video = this.videoRepository.findById(id).orElseThrow(()-> new ResourceNotFound("403","video id not found"));
		this.videoRepository.delete(video);

	}

	@Override
	public UpdateModel updateModel(UpdateModel updateModel, int id) {
		Videos video = this.videoRepository.findById(id).orElseThrow(()-> new ResourceNotFound("501","Id not found"));
		updateModel.setId(id);
		video.setTitle(updateModel.getTitle());
		video.setTags(updateModel.getTags());
		video.setAddedDate(new Date());
		this.videoRepository.save(video);
		return updateModel ;
	}


}
