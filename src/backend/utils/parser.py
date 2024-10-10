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

        halle_times = {}
        for i in range(len(halle_data) - 1):
            current_halle = halle_data[i]
            next_halle = halle_data[i + 1]
            time_spent = (next_halle["TEMPO"] - current_halle["TEMPO"]).total_seconds() / 60
            halle_times[current_halle["HALLE"]] = time_spent

        halle_times[halle_data[-1]["HALLE"]] = 0

        results.append({
            "KNR": knr,
            "HALLE_TIMES": halle_times
        })

    return results

def parse_failures(data):
    total_sums = defaultdict(int)
    total_registers = len(data)
    for entry in data:
        for key, value in entry.items():
            total_sums[key] += value

    return total_sums, total_registers