import { StyleSheet, Dimensions } from "react-native";
import { StatusBar } from 'react-native';

const textColor = '#555555';
const textColorLight = '#cccccc';
const backgroundColor = '#ffffff';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  item: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomColor: "#aaaaaa44",
    borderBottomWidth: 1,
  },
  stateContainer: {
    marginTop: 40,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  appState: {
    fontFamily: 'RobotoSlab-Medium',
    alignSelf: 'center',
    fontSize: 28,
    color: '#ccc'
  },
  loadDb: {
    alignSelf: 'center',
    fontSize: 28,
    fontFamily: 'RobotoSlab-Medium',
    textAlign: 'center',
  },
  title: {
    fontSize: 17,
    fontFamily: 'RobotoSlab-Medium',
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'RobotoSlab-Medium',
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    padding: 10,
  },
  iconDownload: {
    alignSelf: "center",
    marginTop: 50,
    padding: 20,
  },
  songHeader: {
    flexDirection: 'row',
  },
  searchHeader: {
    flexDirection: 'row',
  },
  input: {
    maxWidth: Dimensions.get('window').width - 60,
    fontSize: 16,
    fontFamily: 'RobotoSlab-Medium',
    paddingHorizontal: 20,
    marginLeft: 16,
    marginVertical: 20,
    height: 55,
    borderRadius: 27.5,
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    color: textColor,
  },
  songHeaderTitle: {
    flexGrow: 1,
    paddingTop: 15,
    width: Dimensions.get('window').width - 170,
  },
  songScrollView: {
    marginHorizontal: 10,
  },
  menuTrigger: {
    padding: 20,
    color: textColorLight,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  menuItem: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 15,
    color: textColor,
  },
  imageGiraffe: {
    position: 'absolute',
    marginTop: Dimensions.get('window').height - 250,
  },
  songHeaderTransposition: {
    paddingTop: 20,
    flexDirection: 'row',
    width: 100,
  },
  iconBack: {
    paddingTop: 10,
  },
  shift: {
    fontSize: 9,
    fontFamily: 'RobotoSlab-Medium',
    color: "#aaaaaa"
  }
});