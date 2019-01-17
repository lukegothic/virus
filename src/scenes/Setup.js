import React from 'react';
import * as utils from '../utils.js';
const Setup = ({minPlayers, maxPlayers, onEndSetup}) => utils.range(minPlayers, maxPlayers).map((pn) => <button key={`pn${pn}`} onClick={() => onEndSetup(pn)}>{pn}</button>)
export default Setup