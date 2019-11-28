export default {
  slide: {
    padding: 15,
    minHeight: 150,
    color: '#fff',
    display: 'grid',
  },
  sliderRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  rowFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexGrow: 1,
  },
  slideTop: {
    gridArea: 'a',
    gridColumn: 'span 2',
  },
  slideBottom: {
    gridArea: 'd',
    gridColumn: 'span 2',
  },
  slideFrom: {
    background: '#1b48b4',
  },
  slideTo: {
    background: '#2a6cff',
  },
  xr: {
    gridArea: 'b',
  },
  textInput: {
    width: '100%',
    margin: 'auto',
  },
  currencyHeading: {
    textTransform: 'uppercase',
  },
  container: {
    display: 'grid',
    gridTemplateAreas: "'a a'\
    'b c'\
    'd d'",
  },
  button: {
    width: 200,
    margin: '20px auto',
    display: 'block',
  },
  arrow: {
    gridArea: 'c',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontWeight: 'bolder',
  },
  note: { display: 'block', textAlign: 'center', padding: 10 },
};