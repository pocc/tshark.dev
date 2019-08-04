
import json

import requests

def get_repos_json():
    page = 1
    resp = requests.get("https://api.github.com/search/repositories?q=wireshark+plugin")
    github_text = resp.text
    repos = json.loads(github_text)
    remaining = repos["total_count"]
    # Traverse pages where each page has 30 results (default)
    while remaining > 30:
        page += 1
        resp = requests.get("https://api.github.com/search/repositories?q=wireshark+plugin&page=" + str(page))
        github_text = resp.text
        page_repos = json.loads(github_text)
        repos["items"].extend(page_repos["items"])
        remaining -=30
    
    return repos

def create_html(repos_json):
    html_table = "<table><tr><th>Name</th><th>Description</th><th>Stars</th><th>Forks</th><th>Language</th></tr>"
    for repo in repos_json["items"]:
        if not repo["fork"] and repo["stargazers_count"] > 0:
            html_table += "<tr>" 
            html_table += "<td><a href=\"" + repo["html_url"] + "\">" + repo["name"] + "</a></td>"
            html_table += "<td>" + str(repo["description"]).replace("|", "\\|") + "</td>" 
            html_table += "<td>" + str(repo["stargazers_count"]) + "</td>"
            html_table += "<td>" + str(repo["forks_count"]) + "</td>" 
            html_table += "<td>" + str(repo["language"]) + "</td>"
            html_table += "</tr>"
        print("\tProcessing:", repo["name"], repo["html_url"])

    html_table += "</table>"
    with open("_build/wireshark_plugins_stats.html", "w") as f:
        f.write(html_table)

def create_markdown(repos_json):
    markdown_table = "|Name|Description|Stars|Forks|Language|\n|---|---|---|---|---|\n"
    for repo in repos_json["items"]:
        if not repo["fork"] and repo["stargazers_count"] > 0:
            markdown_table += "|[" + repo["name"] + "](" + repo["html_url"] + ")"
            markdown_table += "|" + str(repo["description"]).replace("|", "\\|") 
            markdown_table += "|" + str(repo["stargazers_count"]) 
            markdown_table += "|" + str(repo["forks_count"]) 
            markdown_table += "|" + str(repo["language"]) + "|\n"
        print("\tProcessing:", repo["name"], repo["html_url"])

    with open("_build/wireshark_plugins_stats.md", "w") as f:
        f.write(markdown_table)

def run():
    repos_json = get_repos_json()
    create_markdown(repos_json)


if __name__ == '__main__':
    run()
