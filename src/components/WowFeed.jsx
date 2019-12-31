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
} from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function WowFeed() {
  const classes = useStyles();

  const [charRegion, setCharRegion] = React.useState('');
  const handleCharRegionChange = event => {
    setCharRegion(event.target.value);
  };

  const [guildRegion, setGuildRegion] = React.useState('');
  const handleGuildRegionChange = event => {
    setGuildRegion(event.target.value);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <TextField id="character" label="Character" />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField id="charrealm" label="Realm" />
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="char_region_label">Region</InputLabel>
            <Select
              className={classes.selectEmpty}
              labelId="char_region_label"
              id="char_region"
              name="region"
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
        <Grid item xs={3}>
          <Button variant="contained" type="submit">
            Get RSS
          </Button>
        </Grid>
      </Grid>

      <FormControl className={classes.formControl}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <TextField id="guildname" label="Guild" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField id="guildrealm" label="Realm" />
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="guild_region_label">Region</InputLabel>
              <Select
                className={classes.selectEmpty}
                labelId="guild_region_label"
                id="guild_region"
                name="region"
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

          <Grid item xs={3}>
            <Button variant="contained" type="submit">
              Get RSS
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </React.Fragment>
  );
}
