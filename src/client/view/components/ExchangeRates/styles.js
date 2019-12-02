export default {
  slide: {
    padding: 15,
    minHeight: 100,
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
    margin: 'auto',
    background: 'transparent',
    height: 10,
    color: 'white',
    width: '100%',
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
    margin: 'auto',
    background: 'transparent',
    height: 10,
    width: '100%',
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
  stepper: {
    padding: '10px 0',
  },
};