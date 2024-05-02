import csv
import json

# Replace 'input.csv' and 'output.json' with your file names
csv_file = 'All_data.csv'
json_file = 'output.json'

# Open the CSV file for reading
with open(csv_file, 'r', encoding="utf8") as csv_input_file:
    # Read CSV data into a list of dictionaries
    csv_data = list(csv.DictReader(csv_input_file))

# Write the JSON data to the output file
with open(json_file, 'w') as json_output_file:
    json.dump(csv_data, json_output_file, indent=4)
