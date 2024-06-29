import os
import re
from collections import defaultdict

# Sample error log content
error_log = """
/Users/Miguel/software_development_everything/MY_DEV_PROJECTS_LIBRARY/StudioProjects/SPOTIFY_API_AUDIO_VISUALISER/spotify_api_audio_visualiser/src/components/MainSection/sections/trackList/trackList.jsx
  25:20  error  'recently' is missing in props validation           react/prop-types
  26:18  error  'fetchRecentTracks' is missing in props validation  react/prop-types
  28:18  error  'fetchTracks' is missing in props validation        react/prop-types
  33:31  error  'tracks' is missing in props validation             react/prop-types
  33:38  error  'tracks.slice' is missing in props validation       react/prop-types
  38:42  error  'fetching' is missing in props validation           react/prop-types
  41:29  error  'recently' is missing in props validation           react/prop-types
  42:55  error  'tracks' is missing in props validation             react/prop-types
  43:34  error  'pauseTrack' is missing in props validation         react/prop-types
  44:31  error  'playing' is missing in props validation            react/prop-types
  47:30  error  'tracks' is missing in props validation             react/prop-types
  49:34  error  'pauseTrack' is missing in props validation         react/prop-types
  50:31  error  'currentTrack' is missing in props validation       react/prop-types
  51:31  error  'playing' is missing in props validation            react/prop-types
  52:28  error  'next' is missing in props validation               react/prop-types
  53:39  error  'fetchMoreTracks' is missing in props validation    react/prop-types
"""

# Mapping of prop names to prop types
prop_types_mapping = {
    'fetchMoreTracks': 'func',
    'fetchRecentTracks': 'func',
    'fetchTracks': 'func',
    'tracks': 'array',
    'recently': 'bool',
    'pauseTrack': 'func',
    'playing': 'bool',
    'currentTrack': 'string',
    'fetching': 'bool',
    'next': 'func',
}

def parse_error_log(error_log):
    # Regular expression to extract file paths and prop names
    file_pattern = re.compile(r'(/.*\.jsx)')
    error_pattern = re.compile(r"'(\w+)' is missing in props validation")

    current_file = None
    errors = defaultdict(list)

    for line in error_log.split('\n'):
        file_match = file_pattern.match(line)
        if file_match:
            current_file = file_match.group(1)
        else:
            error_match = error_pattern.search(line)
            if error_match and current_file:
                prop_name = error_match.group(1)
                errors[current_file].append(prop_name)

    return errors

def generate_prop_types(errors):
    prop_types_code = {}

    for file, props in errors.items():
        component_name = os.path.basename(file).split('.')[0]
        prop_types_list = []

        for prop in props:
            prop_type = prop_types_mapping.get(prop, 'any')
            prop_types_list.append(f"  {prop}: PropTypes.{prop_type}")

        prop_types_code[file] = f"{component_name}.PropTypes = {{\n" + ",\n".join(prop_types_list) + "\n}};\n"

    return prop_types_code

def insert_prop_types(file, prop_types_code):
    with open(file, 'r') as f:
        content = f.readlines()

    for i, line in enumerate(content):
        if line.startswith('export default'):
            content.insert(i, prop_types_code)
            break

    with open(file, 'w') as f:
        f.writelines(content)

def main():
    errors = parse_error_log(error_log)
    prop_types_code = generate_prop_types(errors)

    for file, code in prop_types_code.items():
        insert_prop_types(file, code)

if __name__ == "__main__":
    main()
