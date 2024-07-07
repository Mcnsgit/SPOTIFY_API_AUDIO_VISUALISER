# handle_results.py

import json
import os

def handle_results():
    results_file = "gpt_results.json"
    if os.path.exists(results_file):
        with open(results_file, "r") as file:
            results = json.load(file)
            print("GPT Analysis Results:")
            for result in results.get("analysis", []):
                print(result)

if __name__ == "__main__":
    handle_results()
