# Wifi Room Detection
This project lets you predict which room your laptop is in by the relative signal strength of wifi endpoints.

## Usage
First, make sure you've got Node installed and download dependencies:

```sh
npm install
```

Before you can make predictions, you'll need to gather a training data set. Visit various locations/rooms and run:

```sh
./train.sh <room-name>
```

This will repeatedly scan for samples and append them to `examples.db`. You should capture ~50 samples per room, covering the space as you do it. Once you've captured enough, the script can be stopped with a `^C` and you're ready to make predictions:

```sh
./predict.sh
```

Since `examples.db` stores one sample per line containing the room name, you can use tools like `grep` and `cat` to filter, exclude, and combine samples.

## License
MIT
