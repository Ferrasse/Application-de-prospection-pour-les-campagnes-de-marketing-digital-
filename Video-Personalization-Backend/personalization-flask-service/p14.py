import torch
from TTS.api import TTS
from pydub import AudioSegment

def modify_audio(speaker_wav_path,text):
    # Get device
    device = "cuda" if torch.cuda.is_available() else "cpu"

    # Init TTS
    tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)

    # Run TTS
    # ❗ Since this model is a multi-lingual voice cloning model, we must set the target speaker_wav and language
    # Text to speech list of amplitude values as output
    wav = tts.tts(text=text, speaker_wav=speaker_wav_path, language="fr")

    # Text to speech to a file
    tts_output_path = speaker_wav_path.replace(".wav", "_modified.wav")
    tts.tts_to_file(text=text, speaker_wav=speaker_wav_path, language="fr", file_path=tts_output_path)

    # Load the cloned audio with pydub
    audio_cloned = AudioSegment.from_wav(tts_output_path)

    # Duration you want to keep (in milliseconds), adjust as needed
    duration_to_keep = 500  # for example, 5 seconds

    # Remove the last part of the audio
    audio_modified = audio_cloned[:-duration_to_keep]

    # Path to save the modified audio file
    audio_modified_path = tts_output_path.replace(".wav", "_final.wav")

    # Save the modified audio file
    audio_modified.export(audio_modified_path, format="wav")

    # Display a message indicating that the last part has been removed
    print(f"The last part of the audio has been removed. Audio saved to: {audio_modified_path}")


    return audio_modified_path

# Example usage:
#speaker_wav_path = r"C:\Users\dell 7470\Desktop\videoPersannalization\audioF.wav"
#modified_audio_path = modify_audio(speaker_wav_path,"ingénieur")
