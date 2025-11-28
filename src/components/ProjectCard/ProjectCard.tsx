import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { styles } from './projectCardStyles';
import { Badge } from '../Badge/Badge';
import { Contrato } from '../../types/Contrato';

type Props = {
  data: Contrato;
  onPress: (idEmpreendimento: number) => void;
};

export const ProjectCard: React.FC<Props> = React.memo(({ data, onPress }) => {
  const empreendimento = data.unidade?.empreendimento;
  const bloco = data.unidade?.bloco;
  const unidade = data.unidade?.nome;

  const pressFunction = useCallback(() => {
    if (empreendimento) {
      onPress(empreendimento.idempreendimento);
    }
  }, [empreendimento, onPress]);

  const imageSource =
    empreendimento.foto?.url
    ? {
        uri: empreendimento.foto.url
          .replace('[[LARGURA]]', '400')
          .replace('[[ALTURA]]', '300'),
        priority: FastImage.priority.normal,
    }
  : require('../../assets/images/foto-padrao.jpg');

  return (
    <TouchableOpacity style={styles.card} onPress={pressFunction} activeOpacity={0.8}>
      <FastImage
        style={styles.image}
        source={imageSource}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{empreendimento.nome}</Text>

        {bloco && (
          <Text style={styles.location}>
            BLOCO {bloco.idbloco} - {bloco.nome}
          </Text>
        )}

        {unidade && (
          <Text style={styles.location}>
            UNIDADE: {unidade}
          </Text>
        )}

        <View style={styles.badgeWrapper}>
          <Badge label={`${empreendimento.porcentagem_total_estagio_obra ?? 0}%`} />
        </View>
      </View>
    </TouchableOpacity>
  );
}, (prev, next) => prev.data === next.data);