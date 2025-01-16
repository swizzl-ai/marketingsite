from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import os
from urllib.parse import urlparse

class DirectoryHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/api/site-structure':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            structure = self.get_site_structure()
            self.wfile.write(json.dumps(structure).encode())
            return
            
        return super().do_GET()
    
    def get_site_structure(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        structure = {
            'files': [],
            'directories': {}
        }
        
        # Get root files
        for item in os.listdir(base_dir):
            if os.path.isfile(os.path.join(base_dir, item)):
                structure['files'].append(item)
        
        # Get directory contents
        for item in os.listdir(base_dir):
            item_path = os.path.join(base_dir, item)
            if os.path.isdir(item_path) and not item.startswith('.'):
                structure['directories'][item] = []
                for file in os.listdir(item_path):
                    if os.path.isfile(os.path.join(item_path, file)):
                        structure['directories'][item].append(file)
        
        return structure

if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, DirectoryHandler)
    print('Server running on port 8000...')
    httpd.serve_forever()
