# Tube feed managing software - in development

Currently setting up main database - only functionalities are to search for and insert new users via React frontend.

## Future plans
Add in review dates
Add in tube feeds and volumes
Calculate total energy/protein from tube feeds
View all previous review dates
Update current weight centile
Draw graph of weight centile over time
Alerts when child reaches age at which nutritional requirements change, and therefore requires review of tube feed
Alerts when child's inputted weight centile is outside of desired range

## Installation

In terminal: 

```shell
make install
```

Minimum Python version 3.10.
Must have docker installed with postgres image.

## Usage

In separate terminals:

- While in `database` directory:

```shell
make database
```

- While in `backend` directory: 

```shell
make backend
```

- Then while in `frontend` directory:

```shell
make frontend
```

Can then be used via React frontend.