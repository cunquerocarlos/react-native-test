import React from 'react';
import {Modal as ModalRN, StyleSheet, View} from 'react-native';
import {utilSpacing} from '../theme/util';
import Button from './Button';
import Text from './Text';

interface Props {
  title: string;
  visible: boolean;
  onClose: () => void;
  onOk: () => void;
}
const Modal: React.FC<Props> = ({visible, onClose, onOk, title}) => {
  return (
    <ModalRN
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={[styles.modalTitle, utilSpacing.p5]}>{title}</Text>
          <Button text="Confirmar" style={utilSpacing.mb4} onPress={onOk} />
          <Button text="Cancelar" variant="gray" onPress={onClose} />
        </View>
      </View>
    </ModalRN>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end', // Align modal to the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%', // Full width
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align buttons to the right
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  okButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
});

export default Modal;
