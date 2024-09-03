import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import styles from '../../styles/styles.js';
import {TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import BtnArrowBackWhite from '../../../assets/images/btn_arrow_back_white.js';
import BtnArrowBack from '../../../assets/images/btn_arrow_back.js';
import BtnArrowDownWhite from '../../../assets/images/btn_arrow_down_white.js';
import BtnArrowDown from '../../../assets/images/btn_arrow_down.js';
import BtnArrowUpWhite from '../../../assets/images/btn_arrow_up_white.js';
import BtnArrowUp from '../../../assets/images/btn_arrow_up.js';
import BtnNoteWhite from '../../../assets/images/btn_note_white.js';
import BtnNote from '../../../assets/images/btn_note.js';
import transpose from '../../helpers/transpose';

export default function SongScreen(props: any) {
  const [state, setState] = useState({
    transposition: 0,
    darkMode: props.route.params.darkMode,
    song: {
      groupname: props.route.params.groupname,
      title: props.route.params.title,
      text: props.route.params.text,
      html: '',
    },
  });

  useEffect(() => {
    makeHTML();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.transposition]);

  const transposeUp = () => {
    setState({...state, transposition: state.transposition + 1});
  };

  const transposeDown = () => {
    setState({...state, transposition: state.transposition - 1});
  };

  const transposeReset = () => {
    setState({...state, transposition: 0});
  };

  /**
   * Returns transposed chord with html tag
   * @param chord
   * @returns {string}
   */
  const transposeHTML = (_: any, chord: string) => {
    return (
      <span className="chord">{transpose(chord, state.transposition)}</span>
    );
  };

  /**
   * Transform song text to html for WebView
   */
  const makeHTML = () => {
    const styleHTML = `<style type="text/css">
        html, body {
            padding: 0;
            margin: 0;
        }

        .container {
            font-family:  monospace;
            font-size: 100%;
            line-height: 2.5em;
            padding: 1rem;
            flex-grow: 1;
            font-weight: 700;
            min-height: 100vh;
        }

        .row {
            position: relative;
        }

        .chord {          
            position: absolute;
            margin-top: -0.5em;
            font-size: 80%;
            font-weight: 700;
            color: #ffffff;
            background-color: #00000088;
            padding: 0.2em 0.3em;
            border-radius: 0.3em;
            line-height: 1em;
        }

        .verseNumber {
            font-weight: 700;
            background-color: #ffffff;
            padding-right: 0.5em;
        }

        .verseNumber::after {
            content:"";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1.2em;
            border-top: 1px solid #00000033;
            z-index: -1;
        }
        </style>`;

    const styleHTMLDark = `<style type="text/css">
        .container {
            background-color: #000000;
            color: #ffffff;
        }

        .chord {          
            color: #000000;
            background-color: #ffffff88;
        }

        .verseNumber {
            background-color: #000000;
        }
        </style>`;

    const bodyHTML = state.song.text
      .replace(/(.+)/g, '<div class="row">$1&nbsp;</div>')
      .replace(
        /\[([a-zA-Z0-9_#+-/()]{2}\])(.{1,2})(\[[a-zA-Z0-9_#+-/()]+)\]/g,
        '[$1$3]$2',
      )
      .replace(
        /\[([a-zA-Z0-9_#+-/()]{3}\])(.{1,3})(\[[a-zA-Z0-9_#+-/()]+)\]/g,
        '[$1$3]$2',
      )
      .replace(
        /\[([a-zA-Z0-9_#+-/()]{4}\])(.{1,4})(\[[a-zA-Z0-9_#+-/()]+)\]/g,
        '[$1$3]$2',
      )
      .replace(
        /\[([a-zA-Z0-9_#+-/()]{5}\])(.{1,5})(\[[a-zA-Z0-9_#+-/()]+)\]/g,
        '[$1$3]$2',
      )
      .replace(/\[([a-zA-Z0-9_#+-/()\s]+)\]/g, transposeHTML)
      .replace(/<\/span>\s*<span class="chord">/g, ' ')
      .replace(/(?:\r\n|\r|\n)/g, '\n')
      .replace(
        /(\.|=)(R[0-9]{0,2}|Ref|Rf|\*|[0-9]{1,2})(\.:|\.|:)/g,
        '<span class="verseNumber">$2</span>',
      );

    const resultHTML =
      '<meta name="viewport" content="width=device-width, initial-scale=1">' +
      styleHTML +
      (state.darkMode ? styleHTMLDark : '') +
      '<div class="container">' +
      bodyHTML +
      '</div>';

    setState({...state, song: {...state.song, html: resultHTML}});
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: state.darkMode ? '#000' : '#fff'},
      ]}>
      <View style={styles.songHeader}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => props.navigation.goBack()}>
          {state.darkMode ? (
            <BtnArrowBackWhite width="40" height="40" />
          ) : (
            <BtnArrowBack width="40" height="40" />
          )}
        </TouchableOpacity>
        <View style={styles.songHeaderTitle}>
          <Text
            style={[styles.title, {color: state.darkMode ? '#fff' : '#000'}]}>
            {state.song.title}
          </Text>
          <Text
            style={[
              styles.subtitle,
              {color: state.darkMode ? '#fff' : '#000'},
            ]}>
            {state.song.groupname}
          </Text>
        </View>
        <View style={styles.songHeaderTransposition}>
          <TouchableOpacity onPress={() => transposeDown()}>
            {state.darkMode ? (
              <BtnArrowDownWhite width="30" height="30" />
            ) : (
              <BtnArrowDown width="30" height="30" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => transposeReset()}>
            {state.darkMode ? (
              <BtnNoteWhite width="16" height="30" />
            ) : (
              <BtnNote width="16" height="30" />
            )}
          </TouchableOpacity>
          <View>
            <Text
              style={[styles.shift, {color: state.darkMode ? '#fff' : '#000'}]}>
              {state.transposition
                ? state.transposition < 0
                  ? state.transposition
                  : '+' + state.transposition
                : null}
            </Text>
          </View>
          <TouchableOpacity onPress={() => transposeUp()}>
            {state.darkMode ? (
              <BtnArrowUpWhite width="30" height="30" />
            ) : (
              <BtnArrowUp width="30" height="30" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <WebView
        originWhitelist={['*']}
        source={{html: state.song.html}}
        style={{width: '100%', resizeMode: 'cover', flex: 1}}
      />
    </View>
  );
}

SongScreen.navigationOptions = {
  title: 'Song',
};
