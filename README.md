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

This will log each time a sample is recorded to `examples.db`. The script can be stopped with a `^C`. You should capture ~50 samples per location. Once you've done this, you're ready to make predictions:

```sh
./predict.sh
```

This will continually scan and predict your location.

## License
MIT