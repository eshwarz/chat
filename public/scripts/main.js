var socket = io();

(new Session()).init(socket); // session
(new Posts()).init(socket); // posts
(new Comments()).init(socket); // comments
(new Age()).init(); // updates ages of the posts & comments
