import { Button, Container, Menu } from 'semantic-ui-react'

interface NavBarProps {
    openForm: () => void,
}

const NavBar = ({ openForm }: NavBarProps) => {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png"
                        alt="logo"
                        style={{ marginRight: '10px' }}>
                    </img>
                    Reactivities
                </Menu.Item>

                <Menu.Item name='Activities' />

                <Menu.Item>
                    <Button positive content='Create Activity'
                        onClick={() => openForm()}
                    />
                </Menu.Item>
            </Container>
        </Menu>

    )
}

export default NavBar