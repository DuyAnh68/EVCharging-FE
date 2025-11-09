import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import {
    ThunderboltOutlined,
    ShopOutlined,
    CheckCircleOutlined,
} from '@ant-design/icons';
import {
    selectAllStations,
    fetchStations,
    selectStationsStatus
} from '../../../store/slices/chargingStationSlice';
import {
    selectAllSpots,
    fetchSpots,
    selectSpotsStatus
} from '../../../store/slices/chargingSpotSlice';

const { Title } = Typography;

const Dashboard = () => {
    const dispatch = useDispatch();

    // Stations data
    const stations = useSelector(selectAllStations);
    const stationsStatus = useSelector(selectStationsStatus);

    // Spots data
    const spots = useSelector(selectAllSpots);
    const spotsStatus = useSelector(selectSpotsStatus);

    useEffect(() => {
        if (stationsStatus === 'idle') {
            dispatch(fetchStations());
        }
        if (spotsStatus === 'idle') {
            dispatch(fetchSpots());
        }
    }, [dispatch, stationsStatus, spotsStatus]);

    const loading = stationsStatus === 'loading' || spotsStatus === 'loading';
    const error = stationsStatus === 'error' || spotsStatus === 'error';

    // Calculate stats
    const totalStations = stations?.length || 0;
    const totalSpots = spots?.length || 0;
    const availableSpots = spots?.filter(spot => spot.status === 'AVAILABLE').length || 0;

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-red-500">Error loading dashboard data</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Title level={2} className="mb-0 text-gray-800">Tổng quan</Title>
            </div>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={8}>
                    <Card
                        className="hover:shadow-lg transition-all duration-300 h-full"
                        style={{
                            borderLeft: '4px solid #3b82f6',
                            borderRadius: '8px'
                        }}
                    >
                        <Statistic
                            title={<span className="text-gray-600">Tổng trạm sạc</span>}
                            value={totalStations}
                            prefix={<ShopOutlined className="text-blue-500 mr-2" />}
                            valueStyle={{
                                color: '#1d4ed8',
                                fontSize: '24px',
                                fontWeight: '600'
                            }}
                            loading={loading}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                    <Card
                        className="hover:shadow-lg transition-all duration-300 h-full"
                        style={{
                            borderLeft: '4px solid #10b981',
                            borderRadius: '8px'
                        }}
                    >
                        <Statistic
                            title={<span className="text-gray-600">Tổng cổng sạc</span>}
                            value={totalSpots}
                            prefix={<ThunderboltOutlined className="text-green-500 mr-2" />}
                            valueStyle={{
                                color: '#059669',
                                fontSize: '24px',
                                fontWeight: '600'
                            }}
                            loading={loading}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                    <Card
                        className="hover:shadow-lg transition-all duration-300 h-full"
                        style={{
                            borderLeft: '4px solid #f59e0b',
                            borderRadius: '8px'
                        }}
                    >
                        <Statistic
                            title={<span className="text-gray-600">Cổng sạc khả dụng</span>}
                            value={availableSpots}
                            prefix={<CheckCircleOutlined className="text-yellow-500 mr-2" />}
                            valueStyle={{
                                color: '#d97706',
                                fontSize: '24px',
                                fontWeight: '600'
                            }}
                            loading={loading}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;