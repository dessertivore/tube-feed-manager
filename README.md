# Tube feed managing software 

## Description
Software to store information about tube fed patients, for use by a paediatric dietitian.

This app keeps track of whether children were reviewed by the dietitian or not since 
their nutritional requirements changed (at 1, 4, 7, 11 and 15 years of age), what feed
they are on, and how their weight centile is in comparison with their goal weight centile.

## Functions
- CRUD: Create user, read user, update user, delete user
- Create/read reviews
- Create/read/update tube feeds and volumes
- Create/read/update current weight centile
- View graph of weight centile over time, and how it compares to goal weight centile range

## Installation

In terminal: 

```shell
make install
```

Minimum Python version 3.10.
Must have docker installed with postgres image.

## Usage

In separate terminals:

- Start up the database, with PostgreSQL and Docker:

```shell
make database
```

- Start up the API:

```shell
make backend
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
