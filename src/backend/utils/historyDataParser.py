from datetime import datetime
from collections import defaultdict

def parse_halle_times(data):
    grouped_data = defaultdict(list)
    for entry in data:
        grouped_data[entry["KNR"]].append({
            "HALLE": entry["HALLE"],
            "TEMPO": datetime.fromisoformat(entry["TEMPO"])
        })

    results = []

    for knr, halle_data in grouped_data.items():
        halle_data.sort(key=lambda x: x["TEMPO"])

        # Create an object with HALLE names as keys and time spent as values
        halle_times = {}
        for i in range(len(halle_data) - 1):
            current_halle = halle_data[i]
            next_halle = halle_data[i + 1]
            time_spent = (next_halle["TEMPO"] - current_halle["TEMPO"]).total_seconds() / 60
            halle_times[current_halle["HALLE"]] = time_spent

        # Set the last HALLE with zero time as there's no further entry
        halle_times[halle_data[-1]["HALLE"]] = 0

        results.append({
            "KNR": knr,
            "HALLE_TIMES": halle_times
        })

    return results