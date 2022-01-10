import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button } from 'gatsby-theme-material-ui';
import * as React from 'react';

const FormControlStyled = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  width: '100%',
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  position: 'relative',
  top: '10px',
}));

const WowFeedSC = () => {
  const [charName, setCharName] = React.useState('');
  const [charRealm, setCharRealm] = React.useState('');
  const [charRegion, setCharRegion] = React.useState('');

  const handleCharRegionChange = (event) => {
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

  const handleGuildRegionChange = (event) => {
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
          <FormControlStyled>
            <TextField
              error={charName === ''}
              id="character"
              label="Character"
              required
              value={charName}
              onChange={(event) => setCharName(event.target.value)}
            />
          </FormControlStyled>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControlStyled>
            <TextField
              error={charRealm === ''}
              id="charrealm"
              label="Realm"
              required
              value={charRealm}
              onChange={(event) => setCharRealm(event.target.value)}
            />
          </FormControlStyled>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControlStyled error={charRegion === ''}>
            <InputLabel id="char_region_label">Region</InputLabel>
            <Select
              id="char_region"
              labelId="char_region_label"
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
          </FormControlStyled>
        </Grid>
        <Grid item xs={6} sm={3}>
          <ButtonStyled
            color="secondary"
            variant="contained"
            type="submit"
            onClick={openCharFeed}
          >
            Get Char RSS
          </ButtonStyled>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <FormControlStyled>
            <TextField
              error={guildName === ''}
              id="guildname"
              label="Guild"
              required
              value={guildName}
              onChange={(event) => setGuildName(event.target.value)}
            />
          </FormControlStyled>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControlStyled>
            <TextField
              error={guildRealm === ''}
              id="guildrealm"
              label="Realm"
              required
              value={guildRealm}
              onChange={(event) => setGuildRealm(event.target.value)}
            />
          </FormControlStyled>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControlStyled error={guildRegion === ''}>
            <InputLabel id="guild_region_label">Region</InputLabel>
            <Select
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
          </FormControlStyled>
        </Grid>
        <Grid item xs={6} sm={3}>
          <ButtonStyled
            color="secondary"
            variant="contained"
            type="submit"
            onClick={openGuildFeed}
          >
            Get Guild RSS
          </ButtonStyled>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default WowFeedSC;
