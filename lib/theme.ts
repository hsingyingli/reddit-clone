import { Theme, extendTheme } from "@chakra-ui/react";
import {mode, GlobalStyleProps} from '@chakra-ui/theme-tools'
import {SystemStyleObject} from '@chakra-ui/system'

const styles = {
  global: (props: GlobalStyleProps): SystemStyleObject => ({
    body: {
        fontFamily: 'body',
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('#FFFAF0', '#1A202C')(props),
        lineHeight: 'base',
        margin: 0,
        padding: 0,
    },
  })
}

const config = {
  initialColorMode : 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({styles, config})

export default theme

