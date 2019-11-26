export default {
  slide: {
    padding: 15,
    minHeight: 150,
    color: '#fff',
    display: 'grid',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexGrow: 1,
  },
  slideTop: {
    background: '#2264f5',
    gridArea: 'a',
  },
  slideBottom: {
    background: '#2b5bcf',
    gridArea: 'b',
  },
  xr: {
    gridArea: 'c',
  },
  textInput: {
    width: 100,
  },
  currencyHeading: {
    fontSize: 30,
    textTransform: 'uppercase',
  },
  container: {
    display: 'grid',
    gridTemplateAreas: "'a'\
    'c'\
    'b'",
  },
  button: {
    width: 200,
    margin: '20px auto',
    display: 'block',
  },
};