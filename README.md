# welp-socket

welp-socket is our node express server used to handle chat between users in same lobby.    

## Installation

Download [npm](https://www.npmjs.com/get-npm) and [nodejs](https://www.npmjs.com/get-npm).

## Run locally

After git clone welp-sockets repo for first time, install dependencies inside of welp-sockets directory. Run this command if additional dependencies need to be installed after pulling project.
```node
npm install
```
Run command npm start to start the server locally. Changes to server code will automatically restart the server. The server will be on [http://localhost:4000/](http://localhost:4000/).

```node
npm start
```
## Run in Dockers
Download [Dockers](https://docs.docker.com/get-docker/?fbclid=IwAR3090nHyPStlsEjkmUfpwnOTxMfPmvckakDwg5SdQUzlEjG9SwiZya5o7o).


Build docker image from DockerFile and files in context.
```docker
bash build.sh
```
Run docker image inside container.
```docker
bash run.sh
```
The dockers container will be running on [http://localhost:4000/](http://localhost:4000/).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

