import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    position: 'relative',
    top: '10px',
  },
}));

const WowFeed = () => {
  const classes = useStyles();

  const [charName, setCharName] = React.useState('');
  const [charRealm, setCharRealm] = React.useState('');
  const [charRegion, setCharRegion] = React.useState('');

  const handleCharRegionChange = event => {
    setCharRegion(event.target.value);
  };

  const openCharFeed = () => {
    window.open(
      `https://wowfeed.herokuapp.com/?region=${charRegion}&realm=${charRealm}&character=${charName}`,
      '_blank'
    );
  };

  const [guildName, setGuildName] = React.useState('');
  const [guildRealm, setGuildRealm] = React.useState('');
  const [guildRegion, setGuildRegion] = React.useState('');

  const handleGuildRegionChange = event => {
    setGuildRegion(event.target.value);
  };

  const openGuildFeed = () => {
    window.open(
      `https://wowfeed.herokuapp.com/?region=${guildRegion}&realm=${guildRealm}&guild=${guildName}`,
      '_blank'
    );
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <FormControl className={classes.formControl}>
            <TextField
              error={charName === ''}
              id="character"
              label="Character"
              required
              value={charName}
              onChange={event => setCharName(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl className={classes.formControl}>
            <TextField
              error={charRealm === ''}
              id="charrealm"
              label="Realm"
              required
              value={charRealm}
              onChange={event => setCharRealm(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl className={classes.formControl}>
            <InputLabel id="char_region_label">Region</InputLabel>
            <Select
              className={classes.selectEmpty}
              error={charRegion === ''}
              labelId="char_region_label"
              id="char_region"
              name="region"
              required
              value={charRegion}
              onChange={handleCharRegionChange}
            >
              <MenuItem value="eu">Europe</MenuItem>
              <MenuItem value="us">US</MenuItem>
              <MenuItem value="tw">Taiwan</MenuItem>
              <MenuItem value="kr">Korea</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            color="secondary"
            variant="contained"
            type="submit"
            onClick={openCharFeed}
            className={classes.button}
          >
            Get Char RSS
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <FormControl className={classes.formControl}>
            <TextField
              error={guildName === ''}
              id="guildname"
              label="Guild"
              required
              value={guildName}
              onChange={event => setGuildName(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl className={classes.formControl}>
            <TextField
              error={guildRealm === ''}
              id="guildrealm"
              label="Realm"
              required
              value={guildRealm}
              onChange={event => setGuildRealm(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl className={classes.formControl}>
            <InputLabel id="guild_region_label">Region</InputLabel>
            <Select
              error={guildRegion === ''}
              className={classes.selectEmpty}
              labelId="guild_region_label"
              id="guild_region"
              name="region"
              required
              value={guildRegion}
              onChange={handleGuildRegionChange}
            >
              <MenuItem value="eu">Europe</MenuItem>
              <MenuItem value="us">US</MenuItem>
              <MenuItem value="tw">Taiwan</MenuItem>
              <MenuItem value="kr">Korea</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            color="secondary"
            variant="contained"
            type="submit"
            onClick={openGuildFeed}
            className={classes.button}
          >
            Get Guild RSS
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default WowFeed;
