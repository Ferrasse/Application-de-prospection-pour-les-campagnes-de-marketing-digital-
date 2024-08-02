import moviepy.editor as mp
import speech_recognition as sr
import re
import os
import shutil
import json
import pandas as pd
from p14 import modify_audio


def final_process_video(video_path, keywords, result_text, identifier):
    print(f"Identifiant unique reçu : {identifier}")
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    def transcribe_audio(audio_file):
        recognizer = sr.Recognizer()
        with sr.AudioFile(audio_file) as source:
            audio = recognizer.record(source)
        try:
            text = recognizer.recognize_google(audio, language="fr")
            return text
        except sr.UnknownValueError:
            print("Speech recognition could not understand the audio.")
            return ""
        except sr.RequestError as e:
            print(f"Error requesting Google API: {e}")
            return ""

    clip = mp.VideoFileClip(video_path)
    audio_path = "audioF.wav"
    clip.audio.write_audiofile(audio_path, codec='pcm_s16le')
    transcribed_text = transcribe_audio(audio_path)

    video_folder = "videos/"
    audio_folder = "audios/"
    os.makedirs(video_folder, exist_ok=True)
    os.makedirs(audio_folder, exist_ok=True)

    average_word_duration = clip.duration / len(re.findall(r'\w+', transcribed_text))
    word_segments = []
    word_segments_clips = []

    for i, word in enumerate(re.findall(r'\w+', transcribed_text)):
        start_time = i * average_word_duration
        end_time = (i + 1) * average_word_duration
        word_segment = clip.subclip(start_time, end_time)
        segment_filename = os.path.join(video_folder, f"segment_{i + 1}.mp4")
        word_segment.write_videofile(segment_filename, codec="libx264", audio_codec="aac")
        word_segments_clips.append(word_segment)
        word_segments.append((segment_filename, start_time, end_time, 0.0))

    csv_file_path = 'data.csv'
    df = pd.read_csv(csv_file_path, encoding='utf-8')
    matching_rows = df[df.apply(lambda row: any(keyword.lower() in str(row).lower() for keyword in keywords), axis=1)]
    matching_info = []

    for index, row in matching_rows.iterrows():
        info_dict = {}
        for col in df.columns:
            if any(keyword.lower() in str(row[col]).lower() for keyword in keywords):
                info_dict[col] = row[col]
        matching_info.append(info_dict)
    # Print or use the matching information as needed
    for info_dict in matching_info:
        for key, value in info_dict.items():
            print(f"{key}: {value}")

    keywords_lower = [keyword.lower() for keyword in keywords]
    if not isinstance(result_text, dict):
        result_text = json.loads(result_text)

    final_video_filenames = []
    for index, row in df.iterrows():

        for info_dict in matching_info:
            for key, keyword in info_dict.items():
                print(f"Processing keyword: {keyword}")

                for segment in result_text['segments']:
                    segment_text = segment['text'].lower()

                    if keyword in segment_text:
                        print(f"Keyword '{keyword}' found in segment {segment['id']}")
                        for word in segment['words']:
                            word_text = word['word'].lower()

                            if keyword in word_text:
                                print(f"Keyword '{keyword}' found in word '{word_text}'")
                                print(f"Start time: {word['start']}, End time: {word['end']}")
                                print(f"Segment length: {len(word_segments)}")

                                for segment_info in word_segments:
                                    if segment_info[2] >= word['start']:
                                        if (segment_info[2] - word['start'] > ((word['end'] - word['start']) / 2)):
                                            selected_segment = int(re.search(r'\d+', segment_info[0]).group())
                                            original_audio_path = os.path.join(audio_folder,
                                                                               f"audio_{selected_segment}.wav")
                                            print("original_audio_path: " + original_audio_path)
                                            shutil.copy(audio_path, original_audio_path)
                                            text = row[f'{key}']
                                            print("text : " + text)
                                            new_audio_path = modify_audio(audio_path, text)
                                            new_audio = mp.AudioFileClip(new_audio_path)
                                            word_segments_clips[selected_segment - 1] = word_segments_clips[
                                                selected_segment - 1].set_audio(new_audio)
                                            word_segments_clips[selected_segment - 1] = word_segments_clips[
                                                selected_segment - 1].set_duration(new_audio.duration)
                                            new_video_filename = os.path.join(video_folder,
                                                                              f"segment_{selected_segment}_new.mp4")
                                            word_segments_clips[selected_segment - 1].write_videofile(
                                                new_video_filename,
                                                codec="libx264",
                                                audio_codec="aac")
                                            print(
                                                f"New audio added, and video updated at segment_{selected_segment + 1}_new.mp4")
                                            break
                                    elif (segment_info[1] <= word['end'] <= segment_info[2]):
                                        if (word['end'] - segment_info[1] > ((word['end'] - word['start']) / 2)):
                                            selected_segment = int(re.search(r'\d+', segment_info[0]).group())
                                            original_audio_path = os.path.join(audio_folder,
                                                                               f"audio_{selected_segment}.wav")
                                            print("original_audio_path: " + original_audio_path)
                                            shutil.copy(audio_path, original_audio_path)
                                            text = row[f'{key}']
                                            print("text : " + text)
                                            new_audio_path = modify_audio(audio_path, text)
                                            new_audio = mp.AudioFileClip(new_audio_path)
                                            word_segments_clips[selected_segment - 1] = word_segments_clips[
                                                selected_segment - 1].set_audio(new_audio)
                                            word_segments_clips[selected_segment - 1] = word_segments_clips[
                                                selected_segment - 1].set_duration(new_audio.duration)
                                            new_video_filename = os.path.join(video_folder,
                                                                              f"segment_{selected_segment}_new.mp4")
                                            word_segments_clips[selected_segment - 1].write_videofile(
                                                new_video_filename,
                                                codec="libx264",
                                                audio_codec="aac")
                                            print(
                                                f"New audio added, and video updated at segment_{selected_segment}_new.mp4")
                                            break

        final_video = mp.concatenate_videoclips(word_segments_clips)
        final_video_filename = row['first_name'] + ".mp4"
        final_video.write_videofile(final_video_filename, codec="libx264", audio_codec="aac")
        print(f"Final video created: {final_video_filename}")
        final_video_filenames.append(final_video_filename)  # Ajoutez le nom de fichier final à la liste
    clip.close()

    return final_video_filenames  # Retournez la liste de noms de fichiers finaux
