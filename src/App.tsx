import React, { useEffect, useState } from 'react';
import DeviceItem from './deviceItem/DeviceItem';
import { devices as getDevices } from './utils/deviceAPI';
import Modal from 'react-modal'
import moment from 'moment'

require('./App.scss')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    background: '#121212',
    transform: 'translate(-50%, -50%)'
  }
};

function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [deviceToShow, setDeviceToShow] = React.useState(null as any);
  const [devicesList, setDevicesList] = useState([] as any);

  function openModal(idx: number) {
    let item = devicesList[idx];
    setDeviceToShow(item);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    getDevices('http://localhost:8010/devices', 10)
      .then((results) => {
        setDevicesList(results);
      });
  }, []);
  return (
    <main className="App">
      <h1>Devices List</h1>
      {devicesList.map((item: any, idx: number) => (
        <DeviceItem
          index={idx}
          key={idx}
          item={item}
          customClick={(event: any) => { openModal(idx) }} />
      ))}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        {deviceToShow
          ? <div className="modal"  data-testid='modal'>
            <h1>More details</h1>
            <div className="modal_url">Url: <span>{deviceToShow.url ? deviceToShow.url : 'No url'}</span></div>
            <div className="modal_status">Status: <span className={`modal_${deviceToShow.status}`}>{deviceToShow.status ? deviceToShow.status : 'No Status available'}</span></div>
            <div className="modal_lastseen">Last Seen: <span>{deviceToShow.last_seen_at ? moment(deviceToShow.last_seen_at).format('dddd, MMMM Do YYYY, h:mm:ss a') : 'No last seen available'}</span></div>
            <div className="modal_connectionType">Connection type: <span>{deviceToShow.connection_type ? deviceToShow.connection_type : 'No connection type'}</span></div>
            <div className="modal_wifi">Mac Wifi: <span>{deviceToShow.mac_wifi ? deviceToShow.mac_wifi : 'No mac wifi available'}</span></div>
            <div className="modal_simid">Sim Id: <span>{deviceToShow.sim_id ? deviceToShow.sim_id : 'No sim id available'}</span></div>
            <div className="voltage">Voltage: <span>{deviceToShow.voltage ? deviceToShow.voltage : 'No voltage available'}</span></div>
            <div className="serial_number">Serial Number: <span>{deviceToShow.serial_number ? deviceToShow.serial_number : 'No serial number available'}</span></div>
          </div>
          : null}
      </Modal>
    </main>
  );
}

export default App;
