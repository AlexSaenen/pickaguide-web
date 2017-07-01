const K_CIRCLE_SIZE = 20;
const K_STICK_SIZE = 13;
const K_STICK_WIDTH = 3;

const positionsGuidesStyle = {
  position: 'absolute',
  width: K_CIRCLE_SIZE,
  height: K_CIRCLE_SIZE + K_STICK_SIZE,
  left: -K_CIRCLE_SIZE / 2,
  top: -(K_CIRCLE_SIZE + K_STICK_SIZE)
};

const positionsGuidesCircleStyle = {
  position: 'absolute',
  left: -2.5,
  top: -5,
  width: K_CIRCLE_SIZE,
  height: K_CIRCLE_SIZE,
  border: '3px solid #f44336',
  borderRadius: K_CIRCLE_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 12,
  fontWeight: 'bold',
  padding: 0,
  cursor: 'pointer',
  boxShadow: '0 0 0 1px white'
};


const positionsGuidesCircleStyleHover = Object.assign({}, positionsGuidesCircleStyle);
positionsGuidesCircleStyleHover.border = '3px solid #3f51b5';
positionsGuidesCircleStyleHover.color = '#f44336';


const positionsGuidesStickStyleShadow = {
  position: 'absolute',
  left: K_CIRCLE_SIZE / 2 - K_STICK_WIDTH / 2,
  top: K_CIRCLE_SIZE,
  width: K_STICK_WIDTH,
  height: K_STICK_SIZE,
  backgroundColor: '#f44336',
  boxShadow: '0 0 0 1px white'
};


const positionsGuidesStickStyle = {
  position: 'absolute',
  left: K_CIRCLE_SIZE / 2 - K_STICK_WIDTH / 2,
  top: K_CIRCLE_SIZE,
  width: K_STICK_WIDTH,
  height: K_STICK_SIZE,
  backgroundColor: '#3f51b5'
};


export {
  positionsGuidesStyle,
  positionsGuidesCircleStyle, positionsGuidesCircleStyleHover,
  positionsGuidesStickStyle, positionsGuidesStickStyleShadow,
  K_CIRCLE_SIZE, K_STICK_SIZE};
