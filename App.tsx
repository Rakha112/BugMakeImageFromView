import {
  FlatList,
  PixelRatio,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  Canvas,
  Image,
  SkImage,
  makeImageFromView,
} from '@shopify/react-native-skia';

const App = () => {
  const pd = PixelRatio.get();
  const ref = useRef(null);
  const n = 50;
  const array = Array(n);
  const [overlay, setOverlay] = useState<SkImage | null>(null);

  const handlePress = async () => {
    const wait = async (ms: number) =>
      new Promise(resolve => setTimeout(resolve, ms));

    const snapshot = await makeImageFromView(ref);
    setOverlay(snapshot);

    await wait(3000);

    setOverlay(null);
  };

  return (
    <SafeAreaView style={styles.container} ref={ref} collapsable={false}>
      <FlatList
        data={array}
        renderItem={({index}) => {
          return (
            <View style={styles.textContainer} key={index}>
              <Text style={styles.text}>This is a text</Text>
            </View>
          );
        }}
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.textButton}>SNAPSHOT</Text>
        </Pressable>
      </View>
      {overlay && (
        <Canvas style={StyleSheet.absoluteFill} pointerEvents={'none'}>
          <Image
            image={overlay}
            x={0}
            y={0}
            width={overlay.width() / pd}
            height={overlay.height() / pd}
          />
        </Canvas>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d2733',
  },
  textContainer: {
    padding: 20,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingVertical: 20,
  },
  button: {
    borderRadius: 200,
    marginHorizontal: 30,
    padding: 20,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: 'black',
    fontWeight: 'bold',
  },
});
