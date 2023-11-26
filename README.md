# Tube feed managing software 

## Functions
CRUD: Create user, read user, update user, delete user
Add in review dates
Add in tube feeds and volumes
View all previous review dates
Update current weight centile
View graph of weight centile over time, and how it compares to goal weight centile


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
