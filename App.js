import {useState, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Button } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function App() {
  const [nome, setNome] = useState("McDonalds");
  const [descricao, setDescricao] = useState("Fast food");
  const [latitude, setLatitude] = useState("-23.56610806084268");
  const [longitude, setLongitude] = useState("-46.650254998947915");
  const [lista, setLista] = useState([]);

  const mapRef = useRef();

  const salvar = () => { 
    const obj = {nome, descricao, latitude, longitude}
    setLista([...lista, obj]); 
    mapRef.current.animateToRegion(
      { latitude : parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.001,
        longitudeDelta: 0.001}, 1000)
  }

  return (
    <View style={{flex: 1, paddingTop: 50}}>
      <Text>Mapa Google</Text>
      <View style={{flex: 1}}>
        <TextInput placeholder="Nome do Restaurante" 
          value={nome} onChangeText={setNome}/>
        <TextInput placeholder="Descrição" 
          value={descricao} onChangeText={setDescricao}/>
        <TextInput placeholder="Latitude" 
          value={latitude} onChangeText={setLatitude}/>
        <TextInput placeholder="Longitude" 
          value={longitude} onChangeText={setLongitude}/>
        <Button title="Salvar" onPress={salvar}/>
      </View>
      <MapView ref={mapRef} style={{flex: 2}} initialRegion={{
        latitude: -23.56414089009215,
        longitude: -46.65251895791204,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      }}>
        {lista.map( (item, indice) => <Marker
          key={indice}
          title={item.nome}
          description={item.descricao}
          coordinate={{
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude)
          }}
        />)}
      </MapView>

    </View>
  );
}