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
  container: {
    display: 'grid',
    gridTemplateAreas: "\
    'a a'\
    'b b'\
    'c d'\
    'e e'\
    'f f'\
    ",
  },
  slideTop: {
    gridArea: 'a',
    gridColumn: 'span 2',
  },
  stepperTop: {
    gridColumn: 'b',
    margin: '-30px auto',
    background: 'transparent',
    height: 10,
    color: 'white',
  },
  xr: {
    gridArea: 'c',
  },
  arrow: {
    gridArea: 'd',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontWeight: 'bolder',
  },
  slideBottom: {
    gridArea: 'e',
    gridColumn: 'span 2',
  },
  stepperBottom: {
    gridArea: 'f',
    margin: '-30px auto',
    background: 'transparent',
    height: 10,
  },
  slideFrom: {
    background: '#1b48b4',
  },
  slideTo: {
    background: '#2a6cff',
  },
  textInput: {
    width: '100%',
    margin: 'auto',
  },
  currencyHeading: {
    textTransform: 'uppercase',
  },
  button: {
    width: 200,
    margin: '20px auto',
    display: 'block',
  },
  note: { display: 'block', textAlign: 'center', padding: 10 },
};