import React, { memo } from 'react';
import { Row, Col, Divider, Menu, Dropdown } from 'antd';
import { NavLink } from 'react-router-dom';
import {
	useUserStore,
	useUserDispatch,
} from '../../../store/userRedcer/dispatch';
import Logo from './Logo';
import Chat from '../Chat';
import { A } from '../../../components';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { classNames, useToggle } from '../../../js';
import style from './index.module.scss';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { SubMenu } = Menu;

const cls = classNames.bind(style);

interface Ipros {}

function MyDivider() {
	return (
		<Divider
			type='vertical'
			style={{
				backgroundColor: 'white',
			}}
		/>
	);
}

/**
 * 下拉菜单
 */
const menuInPc = (
	<Menu>
		<Menu.Item>
			<NavLink to='/update-pwd'>修改密码</NavLink>
		</Menu.Item>
		<Menu.Item>
			<NavLink to='/user-info'>完善用户信息</NavLink>
		</Menu.Item>
		<Menu.Item>
			<NavLink to='/subscribe'>我的预约</NavLink>
		</Menu.Item>
		<Menu.Item>
			<NavLink to='/contract'>我的合同</NavLink>
		</Menu.Item>
	</Menu>
);

const Header: React.FC<Ipros> = (props) => {
	const store = useUserStore();
	const dispatch = useUserDispatch();

    const screen = useBreakpoint();

    const {visible,toggle} = useToggle(); // 控制侧边栏的显示
    

    // 右侧菜单的显示
    const RightMenu = React.useMemo<React.ReactNode>(() => {
        if(screen.xs){
            return (
                <>
                    <A handleClick={() => toggle()}>点击显示侧边栏</A>
                    <MyDivider />
                    <Chat />
                </>
            );
        }else{
            return (
                <div>
                    <span>{store.username}</span>
                    <MyDivider />
                    <Dropdown overlay={menuInPc}>
                        <span>
                            <A>
                                用户中心
                                <DownOutlined className={cls('arrow')} />
                            </A>
                        </span>
                    </Dropdown>
                    <MyDivider />
                    <NavLink
                        to=''
                        onClick={(e) => {
                            e.preventDefault(); // 阻止默认事件
                            dispatch.logout();
                        }}>
                        注销登录
                    </NavLink>
                    <MyDivider />
                    <Chat />
                </div>
            );
        }
    }, [dispatch, screen.xs, store.username, toggle]);


	
	return (
		<>
            {/* 侧边栏 */}
            {
                visible ? (
                    <>
                        <div className={style.mask} onClick={() => toggle()}></div>
                        <div className={style.sidebar}>
                            <Menu
                                mode="inline"
                                defaultOpenKeys={['2']}
                                onClick={() => toggle()}
                            >
                                <Menu.Item key="1" className={style.username}>
                                    <span>用户名: {store.username}</span>
                                </Menu.Item>
                                <SubMenu key="2" icon={<UserOutlined />} title="用户中心">
                                    <Menu.Item>
                                        <NavLink to='/update-pwd'>修改密码</NavLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <NavLink to='/user-info'>完善用户信息</NavLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <NavLink to='/subscribe'>我的预约</NavLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <NavLink to='/contract'>我的合同</NavLink>
                                    </Menu.Item>
                                </SubMenu>
                                <Menu.Item key="3" icon={<LogoutOutlined />}>
                                    <NavLink
                                        to=''
                                        onClick={(e) => {
                                            e.preventDefault(); // 阻止默认事件
                                            dispatch.logout();
                                        }}>
                                        注销登录
                                    </NavLink>
                                </Menu.Item>
                            </Menu>
                        </div>
                    </>
                ) : null
            }
            {/* 头部显示栏 */}
            <Row justify='space-between'>
                <Col>
                    <NavLink to='' className='text'>
                        <Logo title='公寓管理系统' icon='logo' />
                    </NavLink>
                </Col>
                <Col>
                    {store.token === '' ? (
                        <div>
                            <NavLink to='/login'>登录</NavLink>
                            <MyDivider />
                            <NavLink to='/register'>注册</NavLink>
                        </div>
                    ) : (
                        <>{RightMenu}</>
                    )}
                </Col>
            </Row>
        </>
	);
};
export default memo(Header);
