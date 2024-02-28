import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  games: {
    flex: 1,
    padding: 10
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gameCard: {
    width: 155,
    alignItems: 'center',
    borderColor: '#FFD700',  // Dourado no lugar de 'lime' para a borda
    borderWidth: 1.5,
    borderRadius: 10,
    shadowColor: '#FFD700',  // Dourado no lugar de 'lime' para a sombra
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 4,
    margin: 5,
},
  gameImg: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  gameHeader: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700', // Azul escuro para melhor contraste
    marginBottom: 6,
    fontFamily: 'System',  // Fonte padrão do sistema (adicione uma fonte personalizada para melhor efeito)
    letterSpacing: 1,  // Espaçamento entre caracteres
    textShadowColor: '#D1E9FA',  // Sombra de texto para dar destaque
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  gameSubheader: {
    textAlign: 'center',
    fontSize: 18,  // Tamanho um pouco maior para destaque
    color: '#ff3300',
    marginBottom: 12,
    fontFamily: 'System',  // Fonte padrão do sistema (adicione uma fonte personalizada para melhor efeito)
    textShadowColor: '#FFDDCC',  // Sombra de texto para dar destaque
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  }
});

export default styles;
