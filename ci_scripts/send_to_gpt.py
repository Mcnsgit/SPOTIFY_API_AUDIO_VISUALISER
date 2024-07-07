# send_to_gpt.py

import os
import requests

def send_files_to_gpt(api_token):
    url = "https://api.example.com/analyze"
    headers = {
        "Authorization": f"Bearer {api_token}"
    }
    files = []

    gather_dir = "gathered_files"
    for file_name in os.listdir(gather_dir):
        file_path = os.path.join(gather_dir, file_name)
        files.append(("files", open(file_path, "rb")))

    response = requests.post(url, headers=headers, files=files)
    if response.status_code == 200:
        with open("gpt_results.json", "w") as result_file:
            result_file.write(response.text)
    else:
        print(f"Error: {response.status_code} - {response.text}")

if __name__ == "__main__":
    api_token = os.getenv("GITHUB_TOKEN")
    send_files_to_gpt(api_token)
