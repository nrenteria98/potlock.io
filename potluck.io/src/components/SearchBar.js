import { Button, Input, Form } from 'antd';
import { useEffect, useState } from 'react';

function SearchBar(props) {
  const [form] = Form.useForm();
  const [firstQuery, setFirstQuery] = useState(true);

  const completeDataSet = JSON.parse(localStorage.getItem('data'));

  const filterSongs = (songQuery) => {
    const resultsList = [];
    
    for ( const playlist in completeDataSet ) {
      const songs = completeDataSet[playlist];
      for ( const song of songs ) {
        let songName = song.name.toLowerCase();
        if ( songName.includes(songQuery) ) {
          let matchObj = {
            "playlist": playlist,
            "song": song.name,
            "artists": song.artists
          };
          
          resultsList.push(matchObj);
        };
      };
    };

    return resultsList;
  }

  const onFinish = (query) => {
    const songQuery = query.songName.toLowerCase();
    const resultsList = filterSongs(songQuery);

    props.setResults(resultsList);
    localStorage.setItem("queryResult", JSON.stringify(resultsList));

    if (firstQuery) {
      props.displayResults(true);
      setFirstQuery(false);
    };
  };

  return (
    <Form 
      layout="inline"
      action="/search"
      method="get"
      form={form}
      onFinish={onFinish}
    >
        <Form.Item>
          <label htmlFor="header-search">
              <span className="visually-hidden">Search song name</span>
          </label>
        </Form.Item>
        <Form.Item
          name="songName"
        >
          <Input
              type="text"
              placeholder="Search song name"
              style={
                {
                color: 'silver',
                zIndex: 2,
                borderColor: '#D4AF37',
                height: '5vw',
                width: '30vw',
                minHeight: '50px',
                minWidth: '250px',
                fontSize: 'x-large',
                alignContent: 'center',
                justifyContent: 'center'
                }} 
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="ghost"
            htmlType="submit"
            style={
            {
              color: 'black',
              zIndex: 2,
              borderColor: '#D4AF37',
              height: '5vw',
              width: '10vw',
              minHeight: '50px',
              minWidth: '82.3px',
              fontSize: 'large'
          }}>Search</Button>
        </Form.Item>
    </Form>
  );
};

export default SearchBar;