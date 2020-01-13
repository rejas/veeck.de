import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SearchBar = () => {
  const classes = useStyles();

  const [searchText, setSearchText] = React.useState('');

  const openCharFeed = () => {
    window.open(
      `https://wowfeed.herokuapp.com/`,
      '_blank'
    );
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <TextField
            error={searchText === ''}
            id="character"
            label="Character"
            required
            value={searchText}
            onChange={event => setSearchText(event.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" type="submit" onClick={openCharFeed}>
            Get RSS
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SearchBar;



```javascript
{{> input-text
    id='search__input'
    name='search__input'
    label='What are you searching for?'}}

<form class="form links__form js-links__form" method="get" target="_blank">
    <input type="hidden" name="q" value="" class="js-links__input" />
</form>

{{> icon-button
    label='DuckDuckGo'
    name='duckduckgo'
    url='https://duckduckgo.com/'}}
{{> icon-button
    label='WerStreamtEs'
    name='stream'
    url='https://www.werstreamt.es/filme-serien'}}
{{> icon-button
    label='YouTube'
    name='youtube'
    url='https://www.youtube.com/results'}}
{{> icon-button
    label='Leo'
    name='leo'
    url='https://dict.leo.org/'}}
{{> icon-button
    label='Wikipedia'
    name='wikipedia'
    url='https://en.wikipedia.org/w/index.php'}}
{{> icon-button
    label='Chefkoch'
    name='chefkoch'
    url='https://www.chefkoch.de/suche.php'}}
{{> icon-button
    label='Google'
    name='google'
    url='https://google.com/search'}}
{{> icon-button
    label='IMDB'
    name='imdb'
    url='https://www.imdb.com/find'}}
{{> icon-button
    label='Hearthpwn'
    name='hearthpwn'
    query='search'
    url='https://www.hearthpwn.com/search'}}
{{> icon-button
    label='Wowhead'
    name='wowhead'
    url='https://www.wowhead.com'}}
{{> icon-button
    label='Canoo'
    name='canoo'
    url='http://www.canoo.net/services/Controller?service=canooNet'}}
{{> icon-button
    label='Woxikon'
    name='woxikon'
    url='https://www.woxikon.de'}}
```
