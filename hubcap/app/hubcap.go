// hubcap.go
// Utility to download online pcaps to a temporary folder
package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
    "strconv"
	"regexp"
)

func get_html(url string) (string, error) {
    // Get the ASCII html from a URL
    resp, err := http.Get(url) 
    if err != nil { fmt.Println("ERROR: Failed to crawl `" + url + "`") }
    defer resp.Body.Close()
    html, err := ioutil.ReadAll(resp.Body)
    if err != nil { fmt.Println("ERROR: Failed to read html from `" + url + "`") }
    return string(html), err
}

func get_pl_capture_qty(base_url string) int {
	// Get the number of pages of captures at packetlife.net
	capture_html, _ := get_html(base_url + "/captures") 
	re := regexp.MustCompile(`\?page=(\d+)`)
	page_paths := re.FindAllStringSubmatch(capture_html, -1)
	highest_page := 0
	for _, match := range page_paths {
		page_num, err := strconv.Atoi(match[1])
		if err != nil { fmt.Print("Error found:", err) }
		if highest_page < page_num {
			highest_page = page_num
		}
	} 
	return highest_page
}

func get_capture_paths(base_url string, num_pages int) ([]string, []string) {
    // Get the download URLs of all available pcaps from PacketLife.net
	re := regexp.MustCompile(`<h3>(?P<name>.*?)<small>[\s\S]*?<p>(?P<desc>[\s\S]*?)</p>`)
	//re := regexp.MustCompile(`<a href=\"(\/captures\/.*)\" class=\"btn btn-success\">(.*?) <h3>(.*?)<small>(.*?)<p>(.*?)</p>`)
    var filenames, descriptions []string
		
	for i := 1; i <= num_pages; i++ {
        html, _ := get_html(base_url + "/captures/?page=" + strconv.Itoa(i))
		link_matches := re.FindAllStringSubmatch(html, -1)
		// Get capture group match (partial link) and add it to link list
		for _, match := range link_matches {
			filenames = append(filenames, match[1])
			descriptions = append(descriptions, match[2])
		}
    }
	return filenames, descriptions
}

func main() {
	// Download all files from packet life and perform analysis
    base_url := "http://packetlife.net"
	num_pages := get_pl_capture_qty(base_url)
	filenames, descs := get_capture_paths(base_url, num_pages)
	fmt.Println(S.Ret5())
	// * [ ] Download all files to a temp dir
	// * [ ] Compute the hash of all files
	// * [ ] Get capinfos json for all files
	// * [ ] Create a map of hash => {capinfos..., descriptions}
	if len(filenames) == 0 { fmt.Print(descs) }
}
