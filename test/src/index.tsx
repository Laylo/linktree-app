import { Container, Description, Header } from '@linktr.ee/ui-link-kit'
import { SettingsData } from './types'

import logo from './images/logo.png'

function App({ toggle, your_name, __linkUrl }: SettingsData) {
  return (
    <Container
      primaryCta={toggle ? { label: 'Visit our UI docs for more info', href: 'https://blstrco.github.io/ui-link-kit/' } : null}
      secondaryCta={toggle ? { label: 'Original url for your Linktree link', href: __linkUrl } : null}
      logo={logo}
    >
      <Header heading={`Hello ${your_name}!`} secondaryHeading="Congratulations, you now have a Linktree link!" layout="hero" />
      <Description>{your_name}</Description>
    </Container>
  )
}

export default App
