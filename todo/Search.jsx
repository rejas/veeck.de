import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({}));

const Search = () => {
  const classes = useStyles();

  document.querySelectorAll('.js-search__button').forEach(inputEl => {
    inputEl.addEventListener('click', event => {
      event.preventDefault();

      let iform = document.querySelector('.js-links__form'),
        input = document.querySelector('.js-links__input'),
        query = document.querySelector('#search__input').value,
        queryName = inputEl.dataset.query;

      if (queryName && queryName !== '') {
        input.name = queryName;
      } else {
        input.name = 'q';
      }

      if (query && query !== '') {
        input.value = query;
        iform.action = inputEl.dataset.search;
        iform.submit();
      } else {
        document.querySelector('#search__input').focus();
      }

      return false;
    });
  });

  return (
    <React.Fragment>
      {/*
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
*/}
    </React.Fragment>
  );
};

export default Search;
