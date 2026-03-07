import { ArrowRight, PieChart, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="badge glass-panel animate-float">
                        <Zap size={16} className="badge-icon" />
                        <span>Smart Finance Tracking</span>
                    </div>
                    <h1 className="hero-title">
                        Discover Your <br />
                        <span className="text-gradient">Real Wealth</span>
                    </h1>
                    <p className="hero-subtitle">
                        Stop guessing your true balance. Balensia separates your actual money from subscriptions, shared expenses, and pending refunds.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/signup" className="btn-primary btn-large">
                            Start Free Trial <ArrowRight size={20} />
                        </Link>
                        <Link to="/login" className="btn-secondary btn-large">
                            View Demo
                        </Link>
                    </div>
                </div>

                {/* Abstract 3D/Glass visual elements wrapper placeholder */}
                <div className="hero-visuals">
                    <div className="glass-card main-card animate-float">
                        <div className="card-header">
                            <span className="card-title">Real Balance</span>
                        </div>
                        <div className="card-value text-gradient">₹4,320</div>
                        <div className="card-details">
                            <div className="detail-row">
                                <span>Bank Balance</span>
                                <span>₹5,000</span>
                            </div>
                            <div className="detail-row negative">
                                <span>Subscriptions</span>
                                <span>-₹800</span>
                            </div>
                            <div className="detail-row positive">
                                <span>Refunds Due</span>
                                <span>+₹120</span>
                            </div>
                        </div>
                    </div>

                    <div className="glow-orb orb-1"></div>
                    <div className="glow-orb orb-2"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">Why choose <span className="text-gradient">Balensia?</span></h2>
                <div className="features-grid">
                    <div className="feature-card glass-panel">
                        <div className="feature-icon-wrapper">
                            <PieChart className="feature-icon" size={32} />
                        </div>
                        <h3>Smart Dashboard</h3>
                        <p>Know exactly how much money is yours to spend, updated in real-time.</p>
                    </div>
                    <div className="feature-card glass-panel">
                        <div className="feature-icon-wrapper">
                            <Zap className="feature-icon" size={32} />
                        </div>
                        <h3>Quick Entry</h3>
                        <p>Add expenses blazingly fast with natural language syntax shortcuts.</p>
                    </div>
                    <div className="feature-card glass-panel">
                        <div className="feature-icon-wrapper">
                            <Shield className="feature-icon" size={32} />
                        </div>
                        <h3>Bank Grade Security</h3>
                        <p>Your financial data is encrypted and securely stored. We never sell your data.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
