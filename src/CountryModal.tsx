import * as React from 'react'
import { ModalProps, StyleSheet, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AnimatedModal } from './AnimatedModal'
import { Modal } from './Modal'
import { useTheme } from './CountryTheme'
import { CountryModalContext } from './CountryModalProvider'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export const CountryModal = ({
  children,
  withModal = true,
  disableNativeModal = false,
  animated = true,
  animationType = 'slide',
  ...props
}: ModalProps & {
  children: React.ReactNode
  withModal?: boolean
  disableNativeModal?: boolean
}) => {
  const { backgroundColor } = useTheme()
  const { teleport } = React.useContext(CountryModalContext)
  const content = (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {children}
    </SafeAreaView>
  )
  React.useEffect(() => {
    if (disableNativeModal) {
      teleport!(
        <AnimatedModal visible={props.visible}>{content}</AnimatedModal>,
      )
    }
  }, [disableNativeModal, props.visible])
  if (withModal) {
    if (Platform.OS === 'web') {
      return (
        <Modal {...props} animated={animated} animationType={animationType}>
          {content}
        </Modal>
      )
    }
    if (disableNativeModal) {
      return null
    }
    return (
      <Modal {...props} animated={animated} animationType={animationType}>
        {content}
      </Modal>
    )
  }
  return content
}
