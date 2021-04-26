import React from 'react';
import { render, waitFor } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import App from './App';

test('renders devices', async () => {
  // For moment to be defined in the test runner
  jest.mock('moment', () => () => ({ format: () => '2018–01–30T12:34:56+00:00' }));

  const devices: object[] = [{
    url: "https://fake.url/59",
    status: "connected",
    last_seen_at: "2021-04-26T08:15:34.616586",
    connection_type: "cellular",
    mac_wifi: "e0:c4:f6:7f:f9:91",
    sim_id: "SomeFakeString",
    voltage: 6.948120949561248,
    serial_number: "device_59"
  },
  {
    url: "https://fake.url/5",
    status: "disconnected",
    last_seen_at: "2021-04-26T08:15:34.636810",
    connection_type: "cellular",
    mac_wifi: "c7:04:42:6f:6c:01",
    sim_id: "SomeFakeString",
    voltage: 7.352486788643555,
    serial_number: "device_5"
  },
  {
    url: "https://fake.url/8",
    status: "disconnected",
    last_seen_at: "2021-04-26T08:15:34.637207",
    connection_type: "cellular",
    mac_wifi: "20:15:b1:57:2c:31",
    sim_id: "SomeFakeString",
    voltage: 1.897238954810375,
    serial_number: "device_8"
  }];

  // Mock the API call
  global.fetch = jest.fn((): any =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(devices),
    })
  );

  const { getByTestId,  } = render(<App />);
  await waitFor(async() => {
    const device = getByTestId(`item_1`)
    fireEvent.click(device);
  })
  await waitFor(() => {
    const modal = getByTestId('modal');
    expect(modal).toBeInTheDocument();
  })
});
