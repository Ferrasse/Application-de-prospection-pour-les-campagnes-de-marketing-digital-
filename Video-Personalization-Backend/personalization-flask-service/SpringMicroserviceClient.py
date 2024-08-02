import json
import requests
from flask import jsonify






# Exemple d'interface Feign
class SpringMicroserviceClient:

    def send_data_to_spring(self, data):
            try:
                spring_url = 'http://localhost:8060/api/videos/receive-data'
                response = requests.post(spring_url, json=data)
                response_data = response.json() if response.status_code == 200 else None

                if response.status_code == 200:
                    return response_data
                else:
                    error_msg = f'Erreur lors de l\'envoi des données à Spring: {response.status_code}'
                    return {'error': error_msg}, response.status_code

            except requests.RequestException as e:
                error_msg = f'Erreur de requête lors de l\'envoi des données à Spring: {str(e)}'
                return {'error': error_msg}, 500

            except ValueError as e:
                error_msg = f'Erreur de format JSON lors de la réception des données de Spring: {str(e)}'
                return {'error': error_msg}, 500

#     def process_personalized_videos(self):
#         try:
#             # Appel de personalized_videos() sans importation circulaire
#             result = personalized_videos()
#
#             # Affichage des données retournées
#             print("Données retournées par personalized_videos():")
#             print(json.dumps(result, indent=4))  # Afficher les données formatées JSON
#         except Exception as e:
#             print(f"Erreur lors du traitement des vidéos personnalisées : {str(e)}")

# # Exemple d'utilisation
# if __name__ == '__main__':
#     # Instancier la classe SpringMicroserviceClient
#     client = SpringMicroserviceClient()
#
#     # Appeler la méthode process_personalized_videos pour traiter les vidéos personnalisées
#     client.process_personalized_videos()





