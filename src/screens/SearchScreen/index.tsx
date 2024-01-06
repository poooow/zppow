import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles.js';
import HTMLView from 'react-native-htmlview';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import DownloadIcon from "../../../assets/images/icon_download"
import ArrowUpIcon from "../../../assets/images/icon_arrow_up"
import GiraffeIcon from "../../../assets/images/giraffe"
import KeepAwake from 'react-native-keep-awake';
import { existsDb, getSongList, populateDb } from '../../helpers/db';

type ItemProps = {
  item: {
    id: number;
    groupname: string;
    title: string;
    text: string;
    snippet: string;
  }
};

export default function SearchScreen(props: { navigation: { navigate: (arg0: string, arg1: { groupname: any; title: any; text: any; darkMode: boolean; }) => void; }; }) {
  const [state, setState] = useState({
    dbExists: false,
    songList: [],
    appState: '',
    darkMode: false,
    keepAwake: false
  })

  useEffect(() => {
    (async () => {
      const dbExists = await existsDb()
      if (dbExists) {
        setState({ ...state, songList: await getSongList(""), dbExists: true, appState: "" })
      }
    })()
  }, [])

  const createDb = async () => {
    try {
      await populateDb((status: string) => { setState({ ...state, appState: status }) })
    } catch (error) {
      setState({ ...state, appState: error as string })
    }
    setState({ ...state, dbExists: true })
  }

  const updateSongList = async (query: string) => {
    if (state.dbExists) setState({ ...state, songList: await getSongList(query) })
  }

  const toggleDarkMode = () => {
    setState({ ...state, darkMode: !state.darkMode });
  };

  const toggleAwake = () => {
    if (state.keepAwake) KeepAwake.deactivate();
    else KeepAwake.activate();

    setState({ ...state, keepAwake: !state.keepAwake })
  }

  const renderPopulateDbButton = () => {
    return (
      <TouchableOpacity onPress={() => createDb()}>
        <DownloadIcon style={{ alignSelf: 'center', marginTop: 10 }} width="150" height="150" />
        <Text style={[styles.loadDb, { color: state.darkMode ? '#fff' : '#000' }]}>Nahrát zpěvník{"\n"} z internetu (13 MB)</Text>
      </TouchableOpacity>
    );
  }

  const renderItem = ({ item }: ItemProps) => {
    return (
      <TouchableOpacity onPress={() =>
        props.navigation.navigate('Song', {
          groupname: item.groupname,
          title: item.title,
          text: item.text,
          darkMode: state.darkMode,
        })}>
        <View style={[styles.item, { backgroundColor: state.darkMode ? '#000' : '#fff' }]}>
          <Text style={[styles.title, { color: state.darkMode ? '#fff' : '#000' }]}>{item.title}</Text>
          <Text style={[styles.subtitle, { color: state.darkMode ? '#fff' : '#000' }]}>{item.groupname}</Text>
          <HTMLView
            value={'<div>' + item.snippet.replace(/\n/g, "") + '</div>'}
            stylesheet={stylesHTML}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: state.darkMode ? '#000' : '#fff' }]}>
      <MenuProvider>
        <View style={styles.searchHeader}>
          <TextInput
            style={styles.input}
            onChangeText={text => updateSongList(text)}
            placeholder="Hledat autora, písničku, nebo část textu"
            placeholderTextColor="#99999955"
          />
          <Menu>
            <MenuTrigger>
              <Text
                style={[styles.menuTrigger, { color: state.darkMode ? '#666' : '#ccc' }]}>&#x22EE;</Text>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => toggleDarkMode()}>
                <Text style={styles.menuItem}>{state.darkMode ? 'Zrušit ' : ''}Noční režim</Text>
              </MenuOption>
              <MenuOption onSelect={() => toggleAwake()}>
                <Text style={styles.menuItem}>{state.keepAwake ? 'Zhasínat ' : 'Nezhasínat '}displej</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        {state.appState !== "" || !state.dbExists ?
          <View style={styles.stateContainer}>
            {state.appState ? <Text style={[styles.appState, { color: state.darkMode ? '#666' : '#ccc' }]}>{state.appState}</Text> : null}
            {state.dbExists ? null : renderPopulateDbButton()}
          </View>
          : null}
        {state.songList.length ?
          <View>
            <FlatList
              keyboardShouldPersistTaps={'handled'}
              keyExtractor={(item) => item.id.toString()}
              data={state.songList}
              renderItem={renderItem}
            />
          </View>
          : null}
        {state.appState === '' && state.dbExists ?
          <>
            <View style={styles.stateContainer}>
              <ArrowUpIcon width="100" height="100" />
              <Text></Text>
              <Text style={styles.appState}>Můžete začít hledat</Text>
            </View>
            <View style={styles.imageGiraffe}><GiraffeIcon width="250" height="250" /></View>
          </>
          : null}
      </MenuProvider>
    </View>
  );
}

const stylesHTML = StyleSheet.create({
  div: {
    color: '#888888'
  },
  b: {
    backgroundColor: '#fffb1f44',
    borderRadius: 8,
  },
});
