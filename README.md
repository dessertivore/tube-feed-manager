# Tube feed managing software 

## Description
Software to store information about tube fed patients, for use by a paediatric dietitian.

This app keeps track of whether children were reviewed by the dietitian or not since 
their nutritional requirements changed (at 1, 4, 7, 11 and 15 years of age), what feed
they are on, and how their weight centile is in comparison with their goal weight centile.

<img width="656" alt="Screenshot 2024-01-07 at 18 10 07" src="https://github.com/dessertivore/tube-feed-manager/assets/95981224/05d0626a-fad6-4899-a71e-867e9f7fe8d4">

## Functions
- CRUD: Create user, read user, update user, delete user
- Create/read reviews
- Create/read/update tube feeds and volumes
- Create/read/update current weight centile
- View graph of weight centile over time, and how it compares to goal weight centile range

<img width="595" alt="Screenshot 2024-01-13 at 15 07 51" src="https://github.com/dessertivore/tube-feed-manager/assets/95981224/2df48748-abae-4da7-9080-63556809c2c9">

## Installation

In terminal: 

```shell
make install
```

Minimum Python version 3.10.
Must have docker installed and running.

## Usage

In separate terminals:

- Start up PostgreSQL database and backend with Docker:

```shell
docker-compose up
```

- Start up the React frontend:

```shell
make frontend
```

App can then be used via React frontend.


## Future plans
- Delete specific reviews - in progress
- Search by other parameters:
    - View all patients on a specific tube feed, in case of supply issues
    - Search by age (younger patients need reviewing more frequently)
