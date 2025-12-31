import { ThemedView } from '@/components/ThemedView';
import i18n from '@/constants/i18n';
import useBox from '@/hooks/useBox';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import Icon from './Icon';
import { PrimaryButton } from './PrimaryButton';

type CharityCardProps = {
  title: string;
  type: string;
  description: string;
  onPressLink: () => void;
  onPressAbout?: () => void;
};

export default function CharityCard({
  title,
  type,
  description,
  onPressLink,
  onPressAbout,
}: CharityCardProps) {
  const { isLargeScreen } = useBox();

  const cardBackgroundColor = useThemeColor({}, 'backgroundLight');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');

  const iconName = {
    'charity': 'hand-heart',
    'church': 'church',
    'media': 'media',
  }[type] || 'charity';

  const primaryTextKey = {
    'charity': 'charity.card.charityPrimaryBtnText',
    'church': 'charity.card.churchPrimaryBtnText',
    'media': 'charity.card.mediaPrimaryBtnText',
  }[type] || 'charity';

  return (
    <ThemedView style={[styles.card, isLargeScreen ? styles.cardLarge : styles.cardMobile]}>
      <ThemedView style={[styles.body, { backgroundColor: cardBackgroundColor }]}> 
        <ThemedView style={[styles.titleContainer, {backgroundColor: cardBackgroundColor }]}> 
          <ThemedText style={[styles.title, isLargeScreen && styles.titleLarge]} numberOfLines={2}> 
            {title}
          </ThemedText>
          <Icon name={iconName} size={24} color={iconColor} />
        </ThemedView>
        <ThemedText style={[styles.description, isLargeScreen && styles.descriptionLarge]} numberOfLines={3}> 
          {description}
        </ThemedText>

        <ThemedView style={styles.actions} lightColor="transparent" darkColor="transparent"> 
          {onPressAbout ? (
            <TouchableOpacity onPress={onPressAbout} style={[styles.aboutAction, { borderColor: textColor }]} accessibilityLabel="About">
              <Icon name="info" size={20} color={textColor} />
            </TouchableOpacity>
          ) : null}
          <PrimaryButton
            title={i18n.t(primaryTextKey)}
            iconLeft='charity'
            onPress={onPressLink}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  cardMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  cardLarge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 24,
    height: '100%',
    display: 'flex',
  },
  iconContainer: {
    marginRight: 12,
    width: 52,
    alignItems: 'center',
  },
  body: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    height: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 8
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  titleLarge: {
    fontSize: 17,
  },
  description: {
    fontSize: 13,
    marginBottom: 10,
    flex: 1,
  },
  descriptionLarge: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  aboutAction: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'solid',
  },
});