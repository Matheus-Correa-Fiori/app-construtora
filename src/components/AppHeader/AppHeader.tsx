import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, Modal, Pressable } from 'react-native';
import { Menu as MenuIcon, X } from 'lucide-react-native';
import { styles } from './appheaderStyles';

interface AppHeaderProps {
  showMenu?: boolean;
  onSectionSelect?: (section: string) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ showMenu = false, onSectionSelect }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const selectMenu = (section: string) => {
    setMenuVisible(false);
    onSectionSelect?.(section);
  };

  return (
    <View style={styles.wrapper}>
      {showMenu && (
        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
          <MenuIcon size={26} color="black" />
        </TouchableOpacity>
      )}

      <Image
        source={require('../../assets/images/logo-construtora.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Modal
        visible={menuVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setMenuVisible(false)}>
                <X size={20} color="gray" />
              </TouchableOpacity>

              {[
                'Galeria',
                'Detalhes do Contrato',
                'Andamento da Obra',
                'Comunicados',
                'Financeiro',
              ].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => selectMenu(item)}
                  style={styles.menuItem}
                >
                  <Text style={styles.menuText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default AppHeader;