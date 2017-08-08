var socket = io();

(new Session()).init(socket); // session
(new Posts()).init(socket); // posts

(new Age()).init(); // updates ages of the posts & comments
